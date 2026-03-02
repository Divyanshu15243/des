
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles: only admins can read
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Cities table
CREATE TABLE public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  featured_image TEXT,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'unpublished')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published cities" ON public.cities FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage cities" ON public.cities FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Roadshows table
CREATE TABLE public.roadshows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
  venue TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  short_description TEXT,
  full_description TEXT,
  banner_image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  registration_link TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  agenda JSONB DEFAULT '[]',
  speakers JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.roadshows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published roadshows" ON public.roadshows FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage roadshows" ON public.roadshows FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  author TEXT,
  publish_date DATE DEFAULT CURRENT_DATE,
  featured_image TEXT,
  content TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published blog posts" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Home hero config
CREATE TABLE public.home_hero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mode TEXT NOT NULL DEFAULT 'video' CHECK (mode IN ('video', 'slider')),
  video_url TEXT,
  overlay_text TEXT,
  cta_text TEXT,
  cta_link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.home_hero ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view home hero" ON public.home_hero FOR SELECT USING (true);
CREATE POLICY "Admins can manage home hero" ON public.home_hero FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Home slides
CREATE TABLE public.home_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_id UUID REFERENCES public.home_hero(id) ON DELETE CASCADE,
  image TEXT,
  heading TEXT,
  subheading TEXT,
  cta_text TEXT,
  cta_link TEXT,
  sort_order INT DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.home_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view enabled slides" ON public.home_slides FOR SELECT USING (enabled = true);
CREATE POLICY "Admins can manage slides" ON public.home_slides FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Popups
CREATE TABLE public.popups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT,
  image TEXT,
  cta_text TEXT,
  cta_link TEXT,
  target_pages TEXT NOT NULL DEFAULT 'all' CHECK (target_pages IN ('home', 'all', 'selected')),
  selected_pages TEXT[] DEFAULT '{}',
  trigger_seconds INT DEFAULT 5,
  schedule_start TIMESTAMPTZ,
  schedule_end TIMESTAMPTZ,
  frequency TEXT NOT NULL DEFAULT 'once_session' CHECK (frequency IN ('once_session', 'once_day', 'always')),
  status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.popups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active popups" ON public.popups FOR SELECT USING (status = 'active');
CREATE POLICY "Admins can manage popups" ON public.popups FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Feature items
CREATE TABLE public.feature_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon TEXT,
  image TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'unpublished')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.feature_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published features" ON public.feature_items FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage features" ON public.feature_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Award items
CREATE TABLE public.award_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  year TEXT,
  image TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'unpublished')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.award_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published awards" ON public.award_items FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage awards" ON public.award_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Contact submissions
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage submissions" ON public.contact_submissions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply updated_at triggers
CREATE TRIGGER update_cities_updated_at BEFORE UPDATE ON public.cities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_roadshows_updated_at BEFORE UPDATE ON public.roadshows FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_home_hero_updated_at BEFORE UPDATE ON public.home_hero FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_home_slides_updated_at BEFORE UPDATE ON public.home_slides FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_popups_updated_at BEFORE UPDATE ON public.popups FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_feature_items_updated_at BEFORE UPDATE ON public.feature_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_award_items_updated_at BEFORE UPDATE ON public.award_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
