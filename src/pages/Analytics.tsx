import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { fr } from "date-fns/locale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";
import { 
  Download, Users, Eye, MousePointer, Clock, ArrowUpRight, 
  Smartphone, Monitor, Globe, TrendingUp, FileDown, LogOut,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface AnalyticsEvent {
  id: string;
  event_type: string;
  event_name: string;
  page_path: string;
  referrer: string;
  source: string;
  device_type: string;
  session_id: string;
  visitor_id: string;
  properties: Record<string, unknown>;
  created_at: string;
}

interface AnalyticsSession {
  id: string;
  session_id: string;
  visitor_id: string;
  start_time: string;
  end_time: string;
  page_views: number;
  device_type: string;
  source: string;
  entry_page: string;
  exit_page: string;
}

const Analytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState("7");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [pageFilter, setPageFilter] = useState("all");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Auth check
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session?.user);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session?.user);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const startDate = startOfDay(subDays(new Date(), parseInt(dateRange)));
  const endDate = endOfDay(new Date());

  // Fetch events
  const { data: events, isLoading: eventsLoading, refetch: refetchEvents } = useQuery({
    queryKey: ['analytics-events', dateRange, eventTypeFilter, pageFilter],
    queryFn: async () => {
      let query = supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .order('created_at', { ascending: false });

      if (eventTypeFilter !== 'all') {
        query = query.eq('event_type', eventTypeFilter);
      }
      if (pageFilter !== 'all') {
        query = query.eq('page_path', pageFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as AnalyticsEvent[];
    },
    enabled: isAuthenticated === true,
  });

  // Fetch sessions
  const { data: sessions, isLoading: sessionsLoading, refetch: refetchSessions } = useQuery({
    queryKey: ['analytics-sessions', dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_sessions')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as AnalyticsSession[];
    },
    enabled: isAuthenticated === true,
  });

  // Calculate KPIs
  const totalPageViews = events?.filter(e => e.event_name === 'page_view').length || 0;
  const uniqueVisitors = new Set(events?.map(e => e.visitor_id)).size;
  const uniqueSessions = new Set(events?.map(e => e.session_id)).size;
  const avgPagesPerSession = uniqueSessions > 0 ? (totalPageViews / uniqueSessions).toFixed(2) : '0';
  
  // Bounce rate calculation (sessions with only 1 page view)
  const sessionPageViews = events?.reduce((acc, e) => {
    if (e.event_name === 'page_view') {
      acc[e.session_id] = (acc[e.session_id] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>) || {};
  const singlePageSessions = Object.values(sessionPageViews).filter(v => v === 1).length;
  const bounceRate = uniqueSessions > 0 ? ((singlePageSessions / uniqueSessions) * 100).toFixed(1) : '0';

  // Conversions
  const conversions = events?.filter(e => e.event_type === 'conversion') || [];
  const ctaClicks = events?.filter(e => e.event_name === 'cta_click').length || 0;
  const whatsappClicks = events?.filter(e => e.event_name === 'whatsapp_click').length || 0;
  const formSubmits = events?.filter(e => e.event_name === 'form_submit').length || 0;

  // Time series data
  const timeSeriesData = events?.reduce((acc, event) => {
    const date = format(new Date(event.created_at), 'dd/MM');
    const existing = acc.find(d => d.date === date);
    if (existing) {
      existing.events++;
      if (event.event_name === 'page_view') existing.pageViews++;
    } else {
      acc.push({ 
        date, 
        events: 1, 
        pageViews: event.event_name === 'page_view' ? 1 : 0 
      });
    }
    return acc;
  }, [] as { date: string; events: number; pageViews: number }[]) || [];

  // Device distribution
  const deviceData = events?.reduce((acc, e) => {
    const device = e.device_type || 'unknown';
    const existing = acc.find(d => d.name === device);
    if (existing) existing.value++;
    else acc.push({ name: device, value: 1 });
    return acc;
  }, [] as { name: string; value: number }[]) || [];

  // Source distribution
  const sourceData = events?.reduce((acc, e) => {
    const source = e.source || 'Direct';
    const existing = acc.find(d => d.name === source);
    if (existing) existing.value++;
    else acc.push({ name: source, value: 1 });
    return acc;
  }, [] as { name: string; value: number }[])?.sort((a, b) => b.value - a.value).slice(0, 6) || [];

  // Top pages
  const topPages = events?.filter(e => e.event_name === 'page_view')
    .reduce((acc, e) => {
      const existing = acc.find(d => d.page === e.page_path);
      if (existing) existing.views++;
      else acc.push({ page: e.page_path, views: 1 });
      return acc;
    }, [] as { page: string; views: number }[])
    ?.sort((a, b) => b.views - a.views).slice(0, 10) || [];

  // Get unique pages for filter
  const uniquePages = [...new Set(events?.map(e => e.page_path).filter(Boolean))];

  // Export CSV function
  const exportToCSV = (type: 'events' | 'sessions' | 'kpis') => {
    let csvContent = '';
    let filename = '';

    if (type === 'events') {
      filename = `analytics-events-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      const headers = ['Date', 'Type', 'Événement', 'Page', 'Source', 'Appareil', 'Session ID', 'Visitor ID'];
      csvContent = headers.join(',') + '\n';
      events?.forEach(e => {
        csvContent += [
          format(new Date(e.created_at), 'yyyy-MM-dd HH:mm:ss'),
          e.event_type,
          e.event_name,
          e.page_path,
          e.source,
          e.device_type,
          e.session_id,
          e.visitor_id
        ].map(v => `"${v || ''}"`).join(',') + '\n';
      });
    } else if (type === 'sessions') {
      filename = `analytics-sessions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      const headers = ['Date début', 'Date fin', 'Pages vues', 'Page entrée', 'Page sortie', 'Source', 'Appareil'];
      csvContent = headers.join(',') + '\n';
      sessions?.forEach(s => {
        csvContent += [
          format(new Date(s.start_time), 'yyyy-MM-dd HH:mm:ss'),
          s.end_time ? format(new Date(s.end_time), 'yyyy-MM-dd HH:mm:ss') : '',
          s.page_views,
          s.entry_page,
          s.exit_page,
          s.source,
          s.device_type
        ].map(v => `"${v || ''}"`).join(',') + '\n';
      });
    } else {
      filename = `analytics-kpis-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      csvContent = `KPI,Valeur\n`;
      csvContent += `"Pages vues","${totalPageViews}"\n`;
      csvContent += `"Visiteurs uniques","${uniqueVisitors}"\n`;
      csvContent += `"Sessions","${uniqueSessions}"\n`;
      csvContent += `"Pages/Session","${avgPagesPerSession}"\n`;
      csvContent += `"Taux de rebond","${bounceRate}%"\n`;
      csvContent += `"Clics CTA","${ctaClicks}"\n`;
      csvContent += `"Clics WhatsApp","${whatsappClicks}"\n`;
      csvContent += `"Formulaires soumis","${formSubmits}"\n`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    toast({
      title: "Export réussi",
      description: `Fichier ${filename} téléchargé.`,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleRefresh = () => {
    refetchEvents();
    refetchSessions();
    toast({
      title: "Données actualisées",
      description: "Les analytics ont été rafraîchies.",
    });
  };

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  const isLoading = eventsLoading || sessionsLoading;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Analytics</h1>
            <p className="text-muted-foreground">
              Suivez les performances de votre site en temps réel
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[150px]">
                <label className="text-sm font-medium mb-2 block">Période</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Aujourd'hui</SelectItem>
                    <SelectItem value="7">7 derniers jours</SelectItem>
                    <SelectItem value="30">30 derniers jours</SelectItem>
                    <SelectItem value="90">90 derniers jours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 min-w-[150px]">
                <label className="text-sm font-medium mb-2 block">Type d'événement</label>
                <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="traffic">Trafic</SelectItem>
                    <SelectItem value="behavior">Comportement</SelectItem>
                    <SelectItem value="conversion">Conversion</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 min-w-[150px]">
                <label className="text-sm font-medium mb-2 block">Page</label>
                <Select value={pageFilter} onValueChange={setPageFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les pages</SelectItem>
                    {uniquePages.map(page => (
                      <SelectItem key={page} value={page}>{page}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end gap-2">
                <Button onClick={() => exportToCSV('kpis')} variant="default">
                  <FileDown className="h-4 w-4 mr-2" />
                  Export KPIs
                </Button>
                <Button onClick={() => exportToCSV('events')} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Événements
                </Button>
                <Button onClick={() => exportToCSV('sessions')} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Sessions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Pages vues</span>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-2" />
              ) : (
                <p className="text-2xl font-bold mt-2">{totalPageViews.toLocaleString()}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Visiteurs uniques</span>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-2" />
              ) : (
                <p className="text-2xl font-bold mt-2">{uniqueVisitors.toLocaleString()}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Pages/Session</span>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-2" />
              ) : (
                <p className="text-2xl font-bold mt-2">{avgPagesPerSession}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-destructive" />
                <span className="text-sm text-muted-foreground">Taux de rebond</span>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-2" />
              ) : (
                <p className="text-2xl font-bold mt-2">{bounceRate}%</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Conversion Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <MousePointer className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Clics CTA</span>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-2" />
              ) : (
                <p className="text-2xl font-bold mt-2">{ctaClicks}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                <span className="text-sm text-muted-foreground">WhatsApp</span>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-2" />
              ) : (
                <p className="text-2xl font-bold mt-2">{whatsappClicks}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Formulaires</span>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-2" />
              ) : (
                <p className="text-2xl font-bold mt-2">{formSubmits}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-muted-foreground">Conversions totales</span>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-20 mt-2" />
              ) : (
                <p className="text-2xl font-bold mt-2">{conversions.length}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="traffic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="traffic">Trafic</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="devices">Appareils</TabsTrigger>
          </TabsList>

          <TabsContent value="traffic">
            <Card>
              <CardHeader>
                <CardTitle>Évolution du trafic</CardTitle>
                <CardDescription>Pages vues et événements par jour</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="pageViews" 
                        name="Pages vues"
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="events" 
                        name="Événements"
                        stroke="hsl(var(--secondary))" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sources de trafic</CardTitle>
                  <CardDescription>D'où viennent vos visiteurs</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-[300px] w-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={sourceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={100}
                          dataKey="value"
                        >
                          {sourceData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top sources</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-[300px] w-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={sourceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="value" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle>Pages les plus visitées</CardTitle>
                <CardDescription>Top 10 des pages par nombre de vues</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[400px] w-full" />
                ) : (
                  <div className="space-y-4">
                    {topPages.map((page, index) => (
                      <div key={page.page} className="flex items-center gap-4">
                        <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        <div className="flex-1">
                          <p className="font-medium truncate">{page.page}</p>
                          <div className="w-full bg-muted rounded-full h-2 mt-1">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(page.views / topPages[0].views) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium">{page.views}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Répartition par appareil</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-[300px] w-full" />
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={100}
                          dataKey="value"
                        >
                          {deviceData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Détail par type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </>
                  ) : (
                    deviceData.map((device, index) => (
                      <div key={device.name} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                        {device.name === 'mobile' ? (
                          <Smartphone className="h-8 w-8 text-primary" />
                        ) : (
                          <Monitor className="h-8 w-8 text-primary" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium capitalize">{device.name}</p>
                          <p className="text-sm text-muted-foreground">{device.value} visites</p>
                        </div>
                        <Badge style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                          {((device.value / (events?.length || 1)) * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
