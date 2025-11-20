import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Grenade {
  id: number;
  type: 'smoke' | 'flash' | 'he';
  title: string;
  position: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  videoUrl?: string;
}

const grenades: Grenade[] = [
  {
    id: 1,
    type: 'smoke',
    title: 'Smoke Mid Window',
    position: 'T Spawn',
    difficulty: 'easy',
    description: 'Встаньте у стены возле выхода из спавна, прицельтесь в верхний угол здания и бросьте дымовую гранату'
  },
  {
    id: 2,
    type: 'flash',
    title: 'Flash Long A',
    position: 'Outside Long',
    difficulty: 'medium',
    description: 'Встаньте у угла, прицельтесь в небо под углом 45 градусов и бросьте флешку с отскоком от стены'
  },
  {
    id: 3,
    type: 'he',
    title: 'HE Grenade B Site',
    position: 'B Tunnels',
    difficulty: 'hard',
    description: 'Прицельтесь в край крыши, прыгните и бросьте гранату для максимального урона по точке'
  },
  {
    id: 4,
    type: 'smoke',
    title: 'Smoke CT Spawn',
    position: 'Mid',
    difficulty: 'medium',
    description: 'Станьте в центре мида, прицельтесь в антенну на крыше и бросьте дым для перекрытия ротации'
  },
  {
    id: 5,
    type: 'flash',
    title: 'Flash B Rush',
    position: 'B Entry',
    difficulty: 'easy',
    description: 'Простая флешка с отскоком от земли перед входом на точку B'
  },
  {
    id: 6,
    type: 'he',
    title: 'HE Box A',
    position: 'A Long',
    difficulty: 'medium',
    description: 'Осколочная граната для выбивания противников с укрытий на точке A'
  }
];

const maps = [
  { name: 'Sandstone', available: true, icon: '🏜️' },
  { name: 'Rust', available: false, icon: '🏭' },
  { name: 'Sakura', available: false, icon: '🌸' },
  { name: 'Zone 9', available: false, icon: '🏗️' }
];

const faqItems = [
  {
    question: 'Как использовать раскидки?',
    answer: 'Найдите нужную позицию на карте, встаньте в указанное место, прицельтесь согласно описанию и бросьте гранату. Практикуйтесь в тренировочном режиме перед реальной игрой.'
  },
  {
    question: 'Что означают уровни сложности?',
    answer: 'Easy - простые раскидки для новичков, Medium - требуют практики и точности, Hard - сложные раскидки для профессионалов с точным таймингом.'
  },
  {
    question: 'Как часто обновляются раскидки?',
    answer: 'Мы обновляем базу раскидок после каждого обновления игры и добавляем новые тактические приёмы от профессиональных игроков.'
  },
  {
    question: 'Можно ли предложить свою раскидку?',
    answer: 'Да! Свяжитесь с нами через форму обратной связи и прикрепите видео с вашей раскидкой. Лучшие добавим в базу с указанием автора.'
  }
];

export default function Index() {
  const [selectedType, setSelectedType] = useState<'all' | 'smoke' | 'flash' | 'he'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const filteredGrenades = grenades.filter(g => 
    (selectedType === 'all' || g.type === selectedType) &&
    (selectedDifficulty === 'all' || g.difficulty === selectedDifficulty)
  );

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'smoke': return 'bg-muted text-muted-foreground';
      case 'flash': return 'bg-secondary text-secondary-foreground';
      case 'he': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Target" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-rajdhani font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SO2 GRENADES
                </h1>
                <p className="text-xs text-muted-foreground">Тактические раскидки Standoff 2</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
              <a href="#grenades" className="text-sm font-medium hover:text-primary transition-colors">Раскидки</a>
              <a href="#guides" className="text-sm font-medium hover:text-primary transition-colors">Гайды</a>
              <a href="#maps" className="text-sm font-medium hover:text-primary transition-colors">Карты</a>
              <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
            </nav>
            <Button className="md:hidden" variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <Badge className="mb-4 animate-glow" variant="outline">
                <Icon name="Zap" size={14} className="mr-1" />
                Обновлено для патча 0.28.0
              </Badge>
              <h2 className="text-5xl md:text-7xl font-rajdhani font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Мастер раскидок<br />Sandstone
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Полная база тактических раскидок гранат для карты Sandstone в Standoff 2. 
                От новичков до профессионалов.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" className="font-rajdhani text-lg">
                  <Icon name="Crosshair" size={20} className="mr-2" />
                  Смотреть раскидки
                </Button>
                <Button size="lg" variant="outline" className="font-rajdhani text-lg">
                  <Icon name="BookOpen" size={20} className="mr-2" />
                  Читать гайды
                </Button>
              </div>
              <div className="flex gap-8 justify-center mt-12 text-sm">
                <div>
                  <div className="text-3xl font-rajdhani font-bold text-primary">{grenades.length}+</div>
                  <div className="text-muted-foreground">Раскидок</div>
                </div>
                <div>
                  <div className="text-3xl font-rajdhani font-bold text-secondary">15+</div>
                  <div className="text-muted-foreground">Гайдов</div>
                </div>
                <div>
                  <div className="text-3xl font-rajdhani font-bold text-primary">1</div>
                  <div className="text-muted-foreground">Карта</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="grenades" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-slide-up">
              <h3 className="text-4xl font-rajdhani font-bold mb-4">База раскидок</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Выберите тип гранаты и сложность. Каждая раскидка проверена профессионалами
              </p>
            </div>

            <div className="mb-8 flex flex-wrap gap-4 justify-center">
              <div className="flex gap-2">
                <Button 
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('all')}
                  className="font-rajdhani"
                >
                  Все
                </Button>
                <Button 
                  variant={selectedType === 'smoke' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('smoke')}
                  className="font-rajdhani"
                >
                  <Icon name="Cloud" size={16} className="mr-2" />
                  Smoke
                </Button>
                <Button 
                  variant={selectedType === 'flash' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('flash')}
                  className="font-rajdhani"
                >
                  <Icon name="Lightbulb" size={16} className="mr-2" />
                  Flash
                </Button>
                <Button 
                  variant={selectedType === 'he' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('he')}
                  className="font-rajdhani"
                >
                  <Icon name="Bomb" size={16} className="mr-2" />
                  HE
                </Button>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant={selectedDifficulty === 'all' ? 'secondary' : 'outline'}
                  onClick={() => setSelectedDifficulty('all')}
                  size="sm"
                >
                  Все уровни
                </Button>
                <Button 
                  variant={selectedDifficulty === 'easy' ? 'secondary' : 'outline'}
                  onClick={() => setSelectedDifficulty('easy')}
                  size="sm"
                >
                  Easy
                </Button>
                <Button 
                  variant={selectedDifficulty === 'medium' ? 'secondary' : 'outline'}
                  onClick={() => setSelectedDifficulty('medium')}
                  size="sm"
                >
                  Medium
                </Button>
                <Button 
                  variant={selectedDifficulty === 'hard' ? 'secondary' : 'outline'}
                  onClick={() => setSelectedDifficulty('hard')}
                  size="sm"
                >
                  Hard
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGrenades.map((grenade, index) => (
                <Card 
                  key={grenade.id} 
                  className="group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getTypeColor(grenade.type)}>
                        {grenade.type.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(grenade.difficulty)}>
                        {grenade.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="font-rajdhani text-xl group-hover:text-primary transition-colors">
                      {grenade.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="MapPin" size={14} />
                      {grenade.position}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {grenade.description}
                    </p>
                    <Button className="w-full font-rajdhani" variant="outline">
                      <Icon name="Play" size={16} className="mr-2" />
                      Смотреть видео
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="guides" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-rajdhani font-bold mb-4">Тактические гайды</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Изучите продвинутые тактики и комбинации раскидок
              </p>
            </div>

            <Tabs defaultValue="basics" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basics" className="font-rajdhani">Основы</TabsTrigger>
                <TabsTrigger value="advanced" className="font-rajdhani">Продвинутые</TabsTrigger>
                <TabsTrigger value="pro" className="font-rajdhani">Про уровень</TabsTrigger>
              </TabsList>
              <TabsContent value="basics" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-rajdhani">Основы раскидок для новичков</CardTitle>
                    <CardDescription>Начните с простых, но эффективных раскидок</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <Icon name="CheckCircle" size={20} className="text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Тайминг броска</h4>
                        <p className="text-sm text-muted-foreground">Изучите базовые тайминги для дымов и флешек</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <Icon name="CheckCircle" size={20} className="text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Позиционирование</h4>
                        <p className="text-sm text-muted-foreground">Правильные позиции для точных бросков</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <Icon name="CheckCircle" size={20} className="text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Командная игра</h4>
                        <p className="text-sm text-muted-foreground">Координация раскидок с командой</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="advanced" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-rajdhani">Продвинутые техники</CardTitle>
                    <CardDescription>Для игроков среднего уровня</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <Icon name="Zap" size={20} className="text-secondary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Комбинированные раскидки</h4>
                        <p className="text-sm text-muted-foreground">Связки дымов и флешек для атаки</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <Icon name="Zap" size={20} className="text-secondary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Контр-юзы</h4>
                        <p className="text-sm text-muted-foreground">Использование юзов в защите</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="pro" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-rajdhani">Профессиональный уровень</CardTitle>
                    <CardDescription>Раскидки от про-игроков</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <Icon name="Trophy" size={20} className="text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Экзотические раскидки</h4>
                        <p className="text-sm text-muted-foreground">Необычные и сложные броски</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <Icon name="Trophy" size={20} className="text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Адаптация под мету</h4>
                        <p className="text-sm text-muted-foreground">Изменение тактики под текущую мету</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="maps" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-rajdhani font-bold mb-4">Доступные карты</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Раскидки для популярных карт Standoff 2
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {maps.map((map) => (
                <Card 
                  key={map.name}
                  className={`text-center ${map.available ? 'hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 cursor-pointer' : 'opacity-50'} transition-all duration-300`}
                >
                  <CardHeader>
                    <div className="text-5xl mb-3">{map.icon}</div>
                    <CardTitle className="font-rajdhani">{map.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {map.available ? (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                        Доступно
                      </Badge>
                    ) : (
                      <Badge variant="outline">Скоро</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-rajdhani font-bold mb-4">Частые вопросы</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ответы на популярные вопросы о раскидках
              </p>
            </div>

            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="font-rajdhani text-lg hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-card py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Target" size={20} className="text-white" />
                </div>
                <span className="font-rajdhani font-bold text-xl">SO2 GRENADES</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Лучшая база раскидок для Standoff 2. Обновляется еженедельно.
              </p>
            </div>
            <div>
              <h4 className="font-rajdhani font-bold mb-4">Быстрые ссылки</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#home" className="hover:text-primary transition-colors">Главная</a></li>
                <li><a href="#grenades" className="hover:text-primary transition-colors">Раскидки</a></li>
                <li><a href="#guides" className="hover:text-primary transition-colors">Гайды</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-rajdhani font-bold mb-4">Сообщество</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="icon">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Youtube" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Share2" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 SO2 Grenades. Неофициальный фан-сайт Standoff 2</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
