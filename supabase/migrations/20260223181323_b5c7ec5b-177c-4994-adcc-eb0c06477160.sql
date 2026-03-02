
-- Add new JSONB columns for rich roadshow detail sections
ALTER TABLE public.roadshows
  ADD COLUMN IF NOT EXISTS investment_highlights jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS destinations jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS amenities jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS faqs jsonb DEFAULT '[]'::jsonb;
