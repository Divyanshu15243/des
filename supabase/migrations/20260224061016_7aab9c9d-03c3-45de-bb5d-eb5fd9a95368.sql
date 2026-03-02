
-- Fix roadshows policies
DROP POLICY IF EXISTS "Admins can manage roadshows" ON public.roadshows;
DROP POLICY IF EXISTS "Public can view published roadshows" ON public.roadshows;
CREATE POLICY "Admins can manage roadshows" ON public.roadshows FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public can view published roadshows" ON public.roadshows FOR SELECT USING (status = 'published'::text);

-- Fix cities policies
DROP POLICY IF EXISTS "Admins can manage cities" ON public.cities;
DROP POLICY IF EXISTS "Public can view published cities" ON public.cities;
CREATE POLICY "Admins can manage cities" ON public.cities FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public can view published cities" ON public.cities FOR SELECT USING (status = 'published'::text);

-- Fix blog_posts policies
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can view published blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public can view published blog posts" ON public.blog_posts FOR SELECT USING (status = 'published'::text);

-- Fix award_items policies
DROP POLICY IF EXISTS "Admins can manage awards" ON public.award_items;
DROP POLICY IF EXISTS "Public can view published awards" ON public.award_items;
CREATE POLICY "Admins can manage awards" ON public.award_items FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public can view published awards" ON public.award_items FOR SELECT USING (status = 'published'::text);

-- Fix feature_items policies
DROP POLICY IF EXISTS "Admins can manage features" ON public.feature_items;
DROP POLICY IF EXISTS "Public can view published features" ON public.feature_items;
CREATE POLICY "Admins can manage features" ON public.feature_items FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public can view published features" ON public.feature_items FOR SELECT USING (status = 'published'::text);

-- Fix home_hero policies
DROP POLICY IF EXISTS "Admins can manage home hero" ON public.home_hero;
DROP POLICY IF EXISTS "Public can view home hero" ON public.home_hero;
CREATE POLICY "Admins can manage home hero" ON public.home_hero FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public can view home hero" ON public.home_hero FOR SELECT USING (true);

-- Fix home_slides policies
DROP POLICY IF EXISTS "Admins can manage slides" ON public.home_slides;
DROP POLICY IF EXISTS "Public can view enabled slides" ON public.home_slides;
CREATE POLICY "Admins can manage slides" ON public.home_slides FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public can view enabled slides" ON public.home_slides FOR SELECT USING (enabled = true);

-- Fix popups policies
DROP POLICY IF EXISTS "Admins can manage popups" ON public.popups;
DROP POLICY IF EXISTS "Public can view active popups" ON public.popups;
CREATE POLICY "Admins can manage popups" ON public.popups FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public can view active popups" ON public.popups FOR SELECT USING (status = 'active'::text);

-- Fix contact_submissions policies
DROP POLICY IF EXISTS "Admins can manage submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact" ON public.contact_submissions;
CREATE POLICY "Admins can manage submissions" ON public.contact_submissions FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Fix user_roles policies
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
