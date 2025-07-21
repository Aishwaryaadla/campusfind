import React from 'react'
import {
  Upload,
  Brain,
  Target,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Card from "../components/ui/Card";

const steps = [
  {
    icon: <Upload className="w-6 h-6 text-blue-600" />,
    title: "Upload & Analyze",
    description:
      "Upload images and descriptions. AI extracts visual features using YOLOv8 and generates semantic tags.",
    tech: "Computer Vision + NLP",
    color: "blue",
  },
  {
    icon: <Brain className="w-6 h-6 text-purple-600" />,
    title: "Smart Matching",
    description:
      "AI compares visual embeddings and text similarity across all database entries in real-time.",
    tech: "Vector Similarity + ML",
    color: "purple",
  },
  {
    icon: <Target className="w-6 h-6 text-orange-600" />,
    title: "Confidence Scoring",
    description:
      "Each potential match gets a confidence score based on visual and semantic similarity.",
    tech: "Cosine Similarity + Weights",
    color: "orange",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    title: "Instant Results",
    description:
      "Get ranked matches with confidence scores. Users can confirm matches and connect.",
    tech: "Real-time Notifications",
    color: "green",
  },
];

const AboutPage = () => {
  return (
    <div className="py-16 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How Our Smart AI Works</h2>
        <p className="text-base-content text-opacity-70 max-w-2xl mx-auto">
          Behind every successful match is a sophisticated AI pipeline that
          analyzes, compares, and ranks items with incredible accuracy.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <Card
              title={step.title}
              description={step.description}
              image={null}
            >
              <div className="flex items-center justify-between w-full px-2">
                <div className="bg-base-300 rounded-full p-2">{step.icon}</div>
                <span className="text-xs text-base-content text-opacity-70">
                  {step.tech}
                </span>
              </div>
            </Card>

            {/* Arrow between steps */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="w-6 h-6 text-base-content text-opacity-50" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Performance Section */}
      <div className="mt-16 flex flex-col items-center justify-center">
        <Card title="Performance Highlights" description="">
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.3M+</div>
              <div className="text-sm text-base-content text-opacity-70">
                Items Processed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1.8s</div>
              <div className="text-sm text-base-content text-opacity-70">
                Avg Match Time
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">94.7%</div>
              <div className="text-sm text-base-content text-opacity-70">
                Success Rate
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
