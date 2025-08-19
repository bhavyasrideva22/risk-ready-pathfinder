import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  BookOpen, 
  Target,
  Download,
  RotateCcw
} from "lucide-react";

interface AssessmentResults {
  psychometric_fit_score: number;
  technical_readiness_score: number;
  wiscar_scores: {
    Will: number;
    Interest: number;
    Skill: number;
    CognitiveReadiness: number;
    AbilityToLearn: number;
    RealWorldAlignment: number;
  };
  overall_confidence_score: number;
  recommendation: "Yes" | "No" | "Maybe";
  confidence_level: number;
  next_steps: string[];
  career_suggestions: string[];
  alternative_paths: string[];
  skill_gaps: Array<{
    skill: string;
    current: number;
    target: number;
    gap: number;
    priority: "High" | "Medium" | "Low";
  }>;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const answers = location.state?.answers || {};

  useEffect(() => {
    // Calculate results based on answers
    const calculatedResults = calculateResults(answers);
    setResults(calculatedResults);
  }, [answers]);

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Calculating your results...</p>
        </div>
      </div>
    );
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Yes": return "bg-accent text-accent-foreground";
      case "Maybe": return "bg-warning text-warning-foreground";
      case "No": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getScoreIcon = (score: number) => {
    if (score >= 75) return <CheckCircle className="w-5 h-5 text-accent" />;
    if (score >= 50) return <AlertCircle className="w-5 h-5 text-warning" />;
    return <TrendingDown className="w-5 h-5 text-destructive" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Your Assessment Results
          </h1>
          <Badge className={`text-lg px-4 py-2 ${getRecommendationColor(results.recommendation)}`}>
            Recommendation: {results.recommendation}
          </Badge>
          <p className="text-muted-foreground mt-2">
            {results.confidence_level}% confidence level
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Overall Scores */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Overall Assessment Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Psychometric Fit</span>
                  <span className="text-2xl font-bold">{results.psychometric_fit_score}%</span>
                </div>
                <Progress value={results.psychometric_fit_score} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Technical Readiness</span>
                  <span className="text-2xl font-bold">{results.technical_readiness_score}%</span>
                </div>
                <Progress value={results.technical_readiness_score} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Overall Confidence</span>
                  <span className="text-2xl font-bold">{results.overall_confidence_score}%</span>
                </div>
                <Progress value={results.overall_confidence_score} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Framework */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>WISCAR Framework Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(results.wiscar_scores).map(([key, score]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getScoreIcon(score)}
                    <span className="font-medium">{key}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={score} className="w-20 h-2" />
                    <span className="text-sm font-bold w-8">{score}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Career Recommendations */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recommended Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.career_suggestions.map((career, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skill Gap Analysis */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Skill Development Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.skill_gaps.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.skill}</span>
                      <Badge variant={skill.priority === "High" ? "destructive" : 
                                    skill.priority === "Medium" ? "secondary" : "outline"}>
                        {skill.priority} Priority
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Current: {skill.current}%</span>
                        <span>Target: {skill.target}%</span>
                      </div>
                      <Progress value={(skill.current / skill.target) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Your Personalized Development Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-accent">Immediate Next Steps</h4>
                  <ul className="space-y-2">
                    {results.next_steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {results.alternative_paths.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 text-muted-foreground">Alternative Paths to Consider</h4>
                    <ul className="space-y-2">
                      {results.alternative_paths.map((path, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{path}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={() => navigate('/')}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Assessment Again
          </Button>
          <Button variant="professional">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};

// Results calculation function
function calculateResults(answers: Record<string, any>): AssessmentResults {
  // Simplified calculation logic
  const psychometricScore = calculatePsychometricScore(answers);
  const technicalScore = calculateTechnicalScore(answers);
  const wiscarScores = calculateWISCARScores(answers);
  
  const overallScore = Math.round(
    (psychometricScore + technicalScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3
  );

  const recommendation = overallScore >= 70 ? "Yes" : overallScore >= 50 ? "Maybe" : "No";
  
  return {
    psychometric_fit_score: psychometricScore,
    technical_readiness_score: technicalScore,
    wiscar_scores: wiscarScores,
    overall_confidence_score: overallScore,
    recommendation,
    confidence_level: Math.min(overallScore + 10, 95),
    next_steps: generateNextSteps(overallScore, recommendation),
    career_suggestions: generateCareerSuggestions(recommendation),
    alternative_paths: generateAlternativePaths(recommendation),
    skill_gaps: generateSkillGaps(technicalScore)
  };
}

function calculatePsychometricScore(answers: Record<string, any>): number {
  const relevantAnswers = [
    answers.interest_finance || 5,
    answers.detail_orientation === 1 || answers.detail_orientation === 3 ? 8 : 5,
    answers.work_style === 0 || answers.work_style === 3 ? 8 : 5,
    answers.problem_solving === 0 || answers.problem_solving === 1 ? 8 : 5,
    answers.motivation_level || 5
  ];
  
  return Math.round(relevantAnswers.reduce((sum, score) => sum + score, 0) / relevantAnswers.length * 10);
}

function calculateTechnicalScore(answers: Record<string, any>): number {
  let score = 0;
  const totalQuestions = 5;
  
  // Numerical reasoning (40% increase)
  if (answers.numerical_reasoning === 1) score += 20;
  
  // Logical reasoning 
  if (answers.logical_reasoning === 1) score += 20;
  
  // Compliance knowledge (COSO)
  if (answers.compliance_knowledge === 0) score += 20;
  
  // Risk identification
  if (answers.risk_identification === 1) score += 20;
  
  // Data interpretation comfort
  score += (answers.data_interpretation || 5) * 2;
  
  return Math.min(score, 100);
}

function calculateWISCARScores(answers: Record<string, any>) {
  return {
    Will: Math.round((answers.will_persistence || 5) * 10),
    Interest: Math.round(((answers.interest_career !== undefined ? 8 : 5) + (answers.interest_finance || 5)) / 2 * 10),
    Skill: Math.round((answers.skill_excel || 5) * 10),
    CognitiveReadiness: Math.round((answers.cognitive_readiness === 1 ? 9 : 6) * 10),
    AbilityToLearn: Math.round((answers.learning_ability || 5) * 10),
    RealWorldAlignment: Math.round((answers.real_world_fit === 2 ? 9 : 6) * 10)
  };
}

function generateNextSteps(score: number, recommendation: string): string[] {
  if (recommendation === "Yes") {
    return [
      "Enroll in 'Foundations of Risk Management' course",
      "Develop Excel skills for financial analysis",
      "Study internal audit frameworks (COSO, SOX)",
      "Consider entry-level positions or internships"
    ];
  } else if (recommendation === "Maybe") {
    return [
      "Strengthen analytical and numerical skills",
      "Take introductory courses in finance and accounting",
      "Practice with case studies and scenarios",
      "Assess interest through informational interviews"
    ];
  } else {
    return [
      "Explore related fields like Quality Assurance",
      "Build foundational business and finance knowledge",
      "Consider roles in operations or administration",
      "Reassess career interests and strengths"
    ];
  }
}

function generateCareerSuggestions(recommendation: string): string[] {
  if (recommendation === "Yes") {
    return [
      "Risk Analyst",
      "Internal Auditor", 
      "Compliance Analyst",
      "Operational Risk Associate",
      "Financial Auditor"
    ];
  } else if (recommendation === "Maybe") {
    return [
      "Junior Risk Analyst",
      "Audit Assistant",
      "Compliance Coordinator"
    ];
  } else {
    return [
      "Business Analyst",
      "Data Entry Specialist",
      "Administrative Assistant"
    ];
  }
}

function generateAlternativePaths(recommendation: string): string[] {
  if (recommendation === "No") {
    return [
      "Quality Assurance Analyst",
      "Business Process Coordinator", 
      "Finance Operations Assistant",
      "Data Entry Specialist"
    ];
  }
  return [];
}

function generateSkillGaps(technicalScore: number) {
  return [
    {
      skill: "Excel & Data Analysis",
      current: Math.max(technicalScore - 20, 30),
      target: 85,
      gap: Math.max(55 - technicalScore, 0),
      priority: technicalScore < 50 ? "High" as const : "Medium" as const
    },
    {
      skill: "Internal Controls Knowledge", 
      current: Math.max(technicalScore - 15, 35),
      target: 90,
      gap: Math.max(75 - technicalScore, 0),
      priority: technicalScore < 60 ? "High" as const : "Low" as const
    },
    {
      skill: "Risk Assessment Frameworks",
      current: Math.max(technicalScore - 10, 40), 
      target: 80,
      gap: Math.max(70 - technicalScore, 0),
      priority: "Medium" as const
    },
    {
      skill: "Communication & Reporting",
      current: Math.max(technicalScore + 10, 50),
      target: 80,
      gap: Math.max(70 - technicalScore, 0),
      priority: "Low" as const
    }
  ];
}

export default Results;