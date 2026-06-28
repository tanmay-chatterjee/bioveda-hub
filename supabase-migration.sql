-- BioVeda Hub — Supabase/PostgreSQL schema
-- Run this in your Supabase project: Dashboard → SQL Editor → New Query

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE enquiry_status AS ENUM (
  'new', 'contacted', 'qualified', 'proposal_sent',
  'negotiating', 'won', 'lost', 'spam'
);

CREATE TYPE enquiry_source AS ENUM (
  'website_contact', 'website_product_page', 'website_floating_cta',
  'whatsapp', 'email', 'trade_show', 'referral'
);

CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_name   VARCHAR(255) NOT NULL,
  company_name   VARCHAR(255) NOT NULL,
  email          VARCHAR(255) NOT NULL,
  phone          VARCHAR(50),
  country        VARCHAR(100),
  company_type   VARCHAR(100),
  company_website VARCHAR(500),
  product_slugs  TEXT[] DEFAULT '{}',
  product_names  TEXT[] DEFAULT '{}',
  custom_requirement TEXT,
  estimated_volume   VARCHAR(100),
  frequency          VARCHAR(50),
  requires_coa       BOOLEAN DEFAULT FALSE,
  requires_sample    BOOLEAN DEFAULT FALSE,
  compliance_needs   TEXT[],
  message            TEXT,
  source             enquiry_source DEFAULT 'website_contact',
  source_page        VARCHAR(500),
  utm_source         VARCHAR(255),
  utm_medium         VARCHAR(255),
  utm_campaign       VARCHAR(255),
  status             enquiry_status DEFAULT 'new',
  assigned_to        VARCHAR(255),
  internal_notes     TEXT,
  priority           INTEGER DEFAULT 0,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW(),
  first_response_at  TIMESTAMPTZ
);

CREATE TABLE product_interest (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_slug VARCHAR(255) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  enquiry_id   UUID REFERENCES enquiries(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE newsletter_subscribers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  company_name  VARCHAR(255),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  source        VARCHAR(100)
);

-- Indexes
CREATE INDEX idx_enquiries_status       ON enquiries(status);
CREATE INDEX idx_enquiries_created_at   ON enquiries(created_at DESC);
CREATE INDEX idx_enquiries_company_type ON enquiries(company_type);
CREATE INDEX idx_enquiries_country      ON enquiries(country);
CREATE INDEX idx_enquiries_source       ON enquiries(source);
CREATE INDEX idx_enquiries_product_slugs ON enquiries USING GIN(product_slugs);
CREATE INDEX idx_product_interest_slug  ON product_interest(product_slug);

-- Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_interest ENABLE ROW LEVEL SECURITY;

-- Anon users can only INSERT (public enquiry form)
CREATE POLICY "anon_insert_enquiries" ON enquiries
  FOR INSERT WITH CHECK (true);

-- Service role has full access
CREATE POLICY "service_role_all_enquiries" ON enquiries
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service_role_all_product_interest" ON product_interest
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "anon_insert_product_interest" ON product_interest
  FOR INSERT WITH CHECK (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
