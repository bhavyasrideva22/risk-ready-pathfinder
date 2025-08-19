import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Assessment data structure
const assessmentSections = [
  {
    id: "psychometric",
    title: "Psychometric Evaluation",
    description: "Understanding your personality and motivational fit",
    questions: [
      {
        id: "interest_finance",
        text: "How interested are you in financial systems and compliance?",
        type: "slider",
        min: 1,
        max: 10,
        labels: ["Not interested", "Very interested"]
      },
      {
        id: "detail_orientation",
        text: "When reviewing documents, I prefer to:",
        type: "radio",
        options: [
          "Scan quickly for main points",
          "Read thoroughly and check details",
          "Focus on specific sections only",
          "Review multiple times for accuracy"
        ]
      },
      {
        id: "work_style",
        text: "In a work environment, I thrive when:",
        type: "radio",
        options: [
          "Working independently on structured tasks",
          "Collaborating closely with team members",
          "Leading projects and making decisions",
          "Supporting others and following procedures"
        ]
      },
      {
        id: "problem_solving",
        text: "When facing a complex problem, I typically:",
        type: "radio",
        options: [
          "Break it down into smaller components",
          "Look for similar past examples",
          "Brainstorm creative solutions",
          "Consult with experts or colleagues"
        ]
      },
      {
        id: "motivation_level",
        text: "Rate your motivation to pursue a career in risk management:",
        type: "slider",
        min: 1,
        max: 10,
        labels: ["Low motivation", "Very motivated"]
      }
    ]
  },
  {
    id: "technical",
    title: "Technical & Aptitude Assessment",
    description: "Testing your analytical and domain knowledge",
    questions: [
      {
        id: "numerical_reasoning",
        text: "A company's risk exposure increased from $2M to $2.8M. What is the percentage increase?",
        type: "radio",
        options: ["30%", "40%", "28%", "80%"],
        correct: 1
      },
      {
        id: "logical_reasoning",
        text: "If all audits require documentation AND proper authorization, and this process lacks proper authorization, then:",
        type: "radio",
        options: [
          "The audit is complete",
          "The audit is invalid",
          "Additional documentation is needed",
          "The authorization can be obtained later"
        ],
        correct: 1
      },
      {
        id: "compliance_knowledge",
        text: "Which framework is primarily used for internal control over financial reporting?",
        type: "radio",
        options: ["COSO", "ISO 27001", "ITIL", "BASEL III"],
        correct: 0
      },
      {
        id: "risk_identification",
        text: "A company stores sensitive customer data without encryption. This represents:",
        type: "radio",
        options: [
          "Operational risk only",
          "Compliance and cybersecurity risk",
          "Financial risk only",
          "Strategic risk only"
        ],
        correct: 1
      },
      {
        id: "data_interpretation",
        text: "Rate your comfort level with interpreting financial data and reports:",
        type: "slider",
        min: 1,
        max: 10,
        labels: ["Very uncomfortable", "Very comfortable"]
      }
    ]
  },
  {
    id: "wiscar",
    title: "WISCAR Framework Analysis",
    description: "Comprehensive readiness assessment",
    questions: [
      {
        id: "will_persistence",
        text: "How likely are you to complete a challenging 6-month certification program?",
        type: "slider",
        min: 1,
        max: 10,
        labels: ["Very unlikely", "Very likely"]
      },
      {
        id: "interest_career",
        text: "Which aspect of risk and audit work interests you most?",
        type: "radio",
        options: [
          "Identifying and preventing fraud",
          "Ensuring regulatory compliance",
          "Analyzing financial controls",
          "Improving business processes"
        ]
      },
      {
        id: "skill_excel",
        text: "Rate your current Excel skills:",
        type: "slider",
        min: 1,
        max: 10,
        labels: ["Beginner", "Expert"]
      },
      {
        id: "cognitive_readiness",
        text: "When learning new concepts, I:",
        type: "radio",
        options: [
          "Need multiple examples to understand",
          "Grasp concepts quickly with one explanation",
          "Prefer hands-on practice to learn",
          "Learn best through discussion and questions"
        ]
      },
      {
        id: "learning_ability",
        text: "How comfortable are you with receiving and acting on feedback?",
        type: "slider",
        min: 1,
        max: 10,
        labels: ["Very uncomfortable", "Very comfortable"]
      },
      {
        id: "real_world_fit",
        text: "You discover a significant control weakness during an audit. Your first action would be:",
        type: "radio",
        options: [
          "Document it and continue the audit",
          "Immediately report to management",
          "Investigate the root cause thoroughly",
          "Discuss with the auditee first"
        ]
      }
    ]
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  const totalQuestions = assessmentSections.reduce((total, section) => total + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const currentSectionData = assessmentSections[currentSection];
  const currentQuestionData = currentSectionData.questions[currentQuestion];

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionData.id]: value
    }));
  };

  const goToNext = () => {
    if (currentQuestion < currentSectionData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < assessmentSections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      // Assessment complete, navigate to results
      navigate('/results', { state: { answers } });
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(assessmentSections[currentSection - 1].questions.length - 1);
    }
  };

  const canProceed = answers[currentQuestionData.id] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Risk & Audit Analyst Readiness Assessment
          </h1>
          <p className="text-muted-foreground">
            Section {currentSection + 1} of {assessmentSections.length}: {currentSectionData.title}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{answeredQuestions} of {totalQuestions} questions</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">
              Question {currentQuestion + 1} of {currentSectionData.questions.length}
            </CardTitle>
            <p className="text-muted-foreground">{currentSectionData.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <h3 className="text-lg font-medium">{currentQuestionData.text}</h3>

            {currentQuestionData.type === "radio" && (
              <RadioGroup
                value={answers[currentQuestionData.id]?.toString() || ""}
                onValueChange={(value) => handleAnswer(parseInt(value))}
                className="space-y-3"
              >
                {currentQuestionData.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentQuestionData.type === "slider" && (
              <div className="space-y-4">
                <Slider
                  value={[answers[currentQuestionData.id] || currentQuestionData.min]}
                  onValueChange={(value) => handleAnswer(value[0])}
                  min={currentQuestionData.min}
                  max={currentQuestionData.max}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{currentQuestionData.labels?.[0]}</span>
                  <span className="font-medium">
                    {answers[currentQuestionData.id] || currentQuestionData.min}
                  </span>
                  <span>{currentQuestionData.labels?.[1]}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentSection === 0 && currentQuestion === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            variant="professional"
            onClick={goToNext}
            disabled={!canProceed}
          >
            {currentSection === assessmentSections.length - 1 && 
             currentQuestion === currentSectionData.questions.length - 1 
              ? "Complete Assessment" 
              : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;