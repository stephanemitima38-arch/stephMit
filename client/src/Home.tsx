import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Brain, Sparkles, Loader2, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Streamdown } from 'streamdown';
import { toast } from "sonner";

/**
 * Design Philosophy: Organic Digital
 * - Warm, welcoming aesthetic with sage green and coral accents
 * - Smooth curves and generous spacing
 * - Fluid animations and organic transitions
 * - Interactive prompt interface for generating analogies
 */

interface GeneratedAnalogy {
  concept: string;
  description: string;
  techAnalogy: string;
  techDescription: string;
  sophistication: string;
  timestamp: Date;
}

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("");
  const [generatedAnalogies, setGeneratedAnalogies] = useState<GeneratedAnalogy[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const generateAnalogy = trpc.analogies.generate.useMutation();

  const handleGenerateAnalogy = async () => {
    if (!prompt.trim()) {
      toast.error("Veuillez entrer un concept psychologique");
      return;
    }

    try {
      const result = await generateAnalogy.mutateAsync({
        concept: prompt,
        context: context || undefined,
      });

      if (result.success && result.data) {
        const newAnalogy: GeneratedAnalogy = {
          concept: result.data.concept,
          description: result.data.description,
          techAnalogy: result.data.techAnalogy,
          techDescription: result.data.techDescription,
          sophistication: result.data.sophistication,
          timestamp: new Date(),
        };
        
        setGeneratedAnalogies([newAnalogy, ...generatedAnalogies]);
        setPrompt("");
        setContext("");
        toast.success("Analogie générée avec succès!");
      }
    } catch (error) {
      console.error("Erreur lors de la génération:", error);
      toast.error("Erreur lors de la génération de l'analogie");
    }
  };

  const handleCopyAnalogy = (analogy: GeneratedAnalogy) => {
    const text = `${analogy.concept}\n\n${analogy.description}\n\n→ ${analogy.techAnalogy}\n\n${analogy.techDescription}`;
    navigator.clipboard.writeText(text);
    toast.success("Analogie copiée!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-emerald-100">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-emerald-900">Analogies Psycho-Tech</h1>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-emerald-700">{user?.name}</span>
                <Button variant="outline" className="rounded-full">Déconnexion</Button>
              </>
            ) : (
              <Button className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white rounded-full">
                Connexion
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/hero-bg.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-emerald-900 mb-4 leading-tight">
              Analogies Psycho-Tech Accessibles
            </h2>
            <p className="text-lg md:text-xl text-emerald-700 mb-8 leading-relaxed">
              Pour étudiants, enseignants et chercheurs. Explorez comment les concepts psychologiques se manifestent dans les technologies du quotidien : smartphones, PC, réseaux sociaux, navigateurs web...
            </p>
          </div>
        </div>
      </section>

      {/* Prompt Interface Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 rounded-3xl border-emerald-200 shadow-lg">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-2 block">
                    Concept Psychologique
                  </span>
                  <Input
                    placeholder="Ex: Transfert émotionnel, Biais de confirmation, Résilience..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerateAnalogy()}
                    className="rounded-2xl border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-emerald-300"
                    disabled={isGenerating}
                  />
                </label>
                
                <label className="block">
                  <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-2 block">
                    Contexte Academique (Optionnel)
                  </span>
                  <Textarea
                    placeholder="Ex: Pour un cours de psychologie cognitive, ou pour une recherche sur le comportement utilisateur..."
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    className="rounded-2xl border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 placeholder:text-emerald-300 min-h-20"
                    disabled={isGenerating}
                  />
                </label>
                
                <Button
                  onClick={handleGenerateAnalogy}
                  disabled={generateAnalogy.isPending || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white rounded-full py-6 text-lg font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {generateAnalogy.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Générer l'Analogie
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Generated Analogies Section */}
      {generatedAnalogies.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-emerald-900 mb-8">Analogies Générées</h3>
              
              <div className="space-y-6">
                {generatedAnalogies.map((analogy, idx) => (
                  <Card key={idx} className="p-8 rounded-3xl border-emerald-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="space-y-6">
                      {/* Concept Section */}
                      <div>
                        <h4 className="text-2xl font-bold text-emerald-900 mb-2">
                          {analogy.concept}
                        </h4>
                        <p className="text-emerald-700 leading-relaxed">
                          {analogy.description}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="h-1 rounded-full bg-gradient-to-r from-amber-300 via-emerald-400 to-blue-400 opacity-30" />

                      {/* Tech Analogy Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowRight className="w-5 h-5 text-teal-600" />
                          <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider">Analogie Technologique</p>
                        </div>
                        <h5 className="text-2xl font-bold text-emerald-900 mb-2">
                          {analogy.techAnalogy}
                        </h5>
                        <p className="text-emerald-700 leading-relaxed">
                          {analogy.techDescription}
                        </p>
                      </div>

                      {/* Sophistication Section */}
                      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-4 rounded-2xl">
                        <p className="text-sm text-emerald-700">
                          <span className="font-semibold">Analyse sophistiquée:</span> {analogy.sophistication}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => handleCopyAnalogy(analogy)}
                          variant="outline"
                          className="flex-1 rounded-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copier
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 rounded-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Partager
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {generatedAnalogies.length === 0 && !isGenerating && (
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-lg text-emerald-700">
                Commencez par entrer un concept psychologique pour générer une analogie technologique sophistiquée.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-emerald-900 text-white py-12 mt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Analogies Psycho-Tech</h4>
              <p className="text-emerald-200">
                Connecter la psychologie et la technologie à travers des analogies innovantes et sophistiquées.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Ressources</h4>
              <ul className="space-y-2 text-emerald-200">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Communauté</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-800 pt-8 text-center text-emerald-200">
            <p>&copy; 2025 Analogies Psycho-Tech. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
