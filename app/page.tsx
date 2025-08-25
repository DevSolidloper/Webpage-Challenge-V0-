"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// ML evaluation data
const mlResults = {
  baseline_val: {
    model: "baseline",
    split: "val",
    exact_match: 0.6398601398601399,
    f1_micro: 0.8005952380952381,
    f1_macro: 0.7342422876487694,
    per_class: {
      cardiovascular: 0.8295454545454546,
      hepatorenal: 0.6917293233082706,
      neurological: 0.8926174496644296,
      oncological: 0.5230769230769231,
    },
  },
  baseline_test: {
    model: "baseline",
    split: "test",
    exact_match: 0.6549789621318373,
    f1_micro: 0.8116113744075829,
    f1_macro: 0.7662826651808338,
    per_class: {
      cardiovascular: 0.821917808219178,
      hepatorenal: 0.7251461988304093,
      neurological: 0.8894952251023193,
      oncological: 0.6285714285714286,
    },
  },
  embeddings_val: {
    model: "embeddings",
    split: "val",
    exact_match: 0.7027972027972028,
    f1_micro: 0.8575380359612724,
    f1_macro: 0.8477422783836529,
    per_class: {
      cardiovascular: 0.8795811518324608,
      hepatorenal: 0.8165680473372781,
      neurological: 0.8808664259927798,
      oncological: 0.813953488372093,
    },
  },
  embeddings_test: {
    model: "embeddings",
    split: "test",
    exact_match: 0.6760168302945302,
    f1_micro: 0.8527472527472527,
    f1_macro: 0.8470743773882958,
    per_class: {
      cardiovascular: 0.8450704225352113,
      hepatorenal: 0.8571428571428571,
      neurological: 0.8653295128939829,
      oncological: 0.8207547169811321,
    },
  },
}

// Transform data for charts
const overallMetricsData = [
  {
    metric: "Exact Match",
    baseline_val: mlResults.baseline_val.exact_match * 100,
    baseline_test: mlResults.baseline_test.exact_match * 100,
    embeddings_val: mlResults.embeddings_val.exact_match * 100,
    embeddings_test: mlResults.embeddings_test.exact_match * 100,
  },
  {
    metric: "F1 Micro",
    baseline_val: mlResults.baseline_val.f1_micro * 100,
    baseline_test: mlResults.baseline_test.f1_micro * 100,
    embeddings_val: mlResults.embeddings_val.f1_micro * 100,
    embeddings_test: mlResults.embeddings_test.f1_micro * 100,
  },
  {
    metric: "F1 Macro",
    baseline_val: mlResults.baseline_val.f1_macro * 100,
    baseline_test: mlResults.baseline_test.f1_macro * 100,
    embeddings_val: mlResults.embeddings_val.f1_macro * 100,
    embeddings_test: mlResults.embeddings_test.f1_macro * 100,
  },
]

const perClassData = [
  {
    category: "Cardiovascular",
    baseline_val: mlResults.baseline_val.per_class.cardiovascular * 100,
    baseline_test: mlResults.baseline_test.per_class.cardiovascular * 100,
    embeddings_val: mlResults.embeddings_val.per_class.cardiovascular * 100,
    embeddings_test: mlResults.embeddings_test.per_class.cardiovascular * 100,
  },
  {
    category: "Hepatorenal",
    baseline_val: mlResults.baseline_val.per_class.hepatorenal * 100,
    baseline_test: mlResults.baseline_test.per_class.hepatorenal * 100,
    embeddings_val: mlResults.embeddings_val.per_class.hepatorenal * 100,
    embeddings_test: mlResults.embeddings_test.per_class.hepatorenal * 100,
  },
  {
    category: "Neurological",
    baseline_val: mlResults.baseline_val.per_class.neurological * 100,
    baseline_test: mlResults.baseline_test.per_class.neurological * 100,
    embeddings_val: mlResults.embeddings_val.per_class.neurological * 100,
    embeddings_test: mlResults.embeddings_test.per_class.neurological * 100,
  },
  {
    category: "Oncological",
    baseline_val: mlResults.baseline_val.per_class.oncological * 100,
    baseline_test: mlResults.baseline_test.per_class.oncological * 100,
    embeddings_val: mlResults.embeddings_val.per_class.oncological * 100,
    embeddings_test: mlResults.embeddings_test.per_class.oncological * 100,
  },
]

const radarData = [
  {
    category: "Cardiovascular",
    baseline: mlResults.baseline_test.per_class.cardiovascular * 100,
    embeddings: mlResults.embeddings_test.per_class.cardiovascular * 100,
  },
  {
    category: "Hepatorenal",
    baseline: mlResults.baseline_test.per_class.hepatorenal * 100,
    embeddings: mlResults.embeddings_test.per_class.hepatorenal * 100,
  },
  {
    category: "Neurological",
    baseline: mlResults.baseline_test.per_class.neurological * 100,
    embeddings: mlResults.embeddings_test.per_class.neurological * 100,
  },
  {
    category: "Oncological",
    baseline: mlResults.baseline_test.per_class.oncological * 100,
    embeddings: mlResults.embeddings_test.per_class.oncological * 100,
  },
]

function MetricCard({
  title,
  value,
  improvement,
  description,
}: { title: string; value: number; improvement?: number; description: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{(value * 100).toFixed(1)}%</div>
        {improvement && (
          <div className="flex items-center gap-1 text-sm">
            <Badge variant={improvement > 0 ? "default" : "destructive"} className="text-xs">
              {improvement > 0 ? "+" : ""}
              {(improvement * 100).toFixed(1)}%
            </Badge>
            <span className="text-muted-foreground">vs baseline</span>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function MLDashboard() {
  const embeddingsTestImprovement = {
    exact_match: mlResults.embeddings_test.exact_match - mlResults.baseline_test.exact_match,
    f1_micro: mlResults.embeddings_test.f1_micro - mlResults.baseline_test.f1_micro,
    f1_macro: mlResults.embeddings_test.f1_macro - mlResults.baseline_test.f1_macro,
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">ML Model Evaluation Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive performance analysis comparing baseline and embeddings models across medical categories
          </p>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Test Exact Match"
            value={mlResults.embeddings_test.exact_match}
            improvement={embeddingsTestImprovement.exact_match}
            description="Percentage of predictions that exactly match the ground truth"
          />
          <MetricCard
            title="Test F1 Micro"
            value={mlResults.embeddings_test.f1_micro}
            improvement={embeddingsTestImprovement.f1_micro}
            description="Micro-averaged F1 score across all classes"
          />
          <MetricCard
            title="Test F1 Macro"
            value={mlResults.embeddings_test.f1_macro}
            improvement={embeddingsTestImprovement.f1_macro}
            description="Macro-averaged F1 score treating all classes equally"
          />
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="overall" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overall">Overall Metrics</TabsTrigger>
            <TabsTrigger value="categories">Medical Categories</TabsTrigger>
            <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="overall" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Overall Performance Metrics</CardTitle>
                <CardDescription>
                  Comparison of baseline vs embeddings models across validation and test splits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={overallMetricsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis domain={[0, 100]} />
                      <Bar dataKey="baseline_val" fill="hsl(var(--chart-2))" name="Baseline (Val)" />
                      <Bar dataKey="baseline_test" fill="hsl(var(--chart-3))" name="Baseline (Test)" />
                      <Bar dataKey="embeddings_val" fill="hsl(var(--chart-1))" name="Embeddings (Val)" />
                      <Bar dataKey="embeddings_test" fill="hsl(var(--chart-4))" name="Embeddings (Test)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance by Medical Category</CardTitle>
                <CardDescription>F1 scores across different medical specialties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={perClassData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis domain={[0, 100]} />
                      <Bar dataKey="baseline_test" fill="hsl(var(--chart-3))" name="Baseline (Test)" />
                      <Bar dataKey="embeddings_test" fill="hsl(var(--chart-1))" name="Embeddings (Test)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(mlResults.embeddings_test.per_class).map(([category, score]) => {
                const baselineScore =
                  mlResults.baseline_test.per_class[category as keyof typeof mlResults.baseline_test.per_class]
                const improvement = score - baselineScore
                return (
                  <Card key={category}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium capitalize">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Embeddings</span>
                          <span className="font-medium">{(score * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={score * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Baseline: {(baselineScore * 100).toFixed(1)}%</span>
                          <Badge variant={improvement > 0 ? "default" : "destructive"} className="text-xs">
                            {improvement > 0 ? "+" : ""}
                            {(improvement * 100).toFixed(1)}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Model Comparison Radar Chart</CardTitle>
                <CardDescription>Test performance comparison across all medical categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Baseline"
                        dataKey="baseline"
                        stroke="hsl(var(--chart-3))"
                        fill="hsl(var(--chart-3))"
                        fillOpacity={0.1}
                      />
                      <Radar
                        name="Embeddings"
                        dataKey="embeddings"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.1}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Detailed Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Performance Results</CardTitle>
            <CardDescription>Complete breakdown of all metrics across validation and test splits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Model</th>
                    <th className="text-left p-2 font-medium">Split</th>
                    <th className="text-left p-2 font-medium">Exact Match</th>
                    <th className="text-left p-2 font-medium">F1 Micro</th>
                    <th className="text-left p-2 font-medium">F1 Macro</th>
                    <th className="text-left p-2 font-medium">Cardiovascular</th>
                    <th className="text-left p-2 font-medium">Hepatorenal</th>
                    <th className="text-left p-2 font-medium">Neurological</th>
                    <th className="text-left p-2 font-medium">Oncological</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(mlResults).map(([key, result]) => (
                    <tr key={key} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium capitalize">{result.model}</td>
                      <td className="p-2 capitalize">{result.split}</td>
                      <td className="p-2">{(result.exact_match * 100).toFixed(1)}%</td>
                      <td className="p-2">{(result.f1_micro * 100).toFixed(1)}%</td>
                      <td className="p-2">{(result.f1_macro * 100).toFixed(1)}%</td>
                      <td className="p-2">{(result.per_class.cardiovascular * 100).toFixed(1)}%</td>
                      <td className="p-2">{(result.per_class.hepatorenal * 100).toFixed(1)}%</td>
                      <td className="p-2">{(result.per_class.neurological * 100).toFixed(1)}%</td>
                      <td className="p-2">{(result.per_class.oncological * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
