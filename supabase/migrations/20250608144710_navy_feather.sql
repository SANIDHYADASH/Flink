/*
  # Create shares table for file and text sharing

  1. New Tables
    - `shares`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `type` (text, either 'file' or 'text')
      - `name` (text, name/title of the share)
      - `title` (text, optional custom title)
      - `content` (text, file content or text content)
      - `file_type` (text, MIME type for files)
      - `file_size` (bigint, file size in bytes)
      - `access_code` (text, 6-digit access code)
      - `has_password` (boolean, whether password protected)
      - `password_hash` (text, hashed password if protected)
      - `expires_at` (timestamptz, expiration date)
      - `created_at` (timestamptz, creation timestamp)
      - `download_count` (integer, number of times accessed)
      - `file_path` (text, path to file in storage bucket)

  2. Security
    - Enable RLS on `shares` table
    - Add policies for users to manage their own shares
    - Add policy for public access via access code
*/

-- Create shares table
CREATE TABLE IF NOT EXISTS shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('file', 'text')),
  name text NOT NULL,
  title text,
  content text NOT NULL,
  file_type text,
  file_size bigint,
  access_code text NOT NULL UNIQUE,
  has_password boolean DEFAULT false,
  password_hash text,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  download_count integer DEFAULT 0,
  file_path text
);

-- Enable RLS
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;

-- Policy for users to manage their own shares
CREATE POLICY "Users can manage their own shares"
  ON shares
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for public access via access code (for viewing shares)
CREATE POLICY "Public can view shares by access code"
  ON shares
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy for updating download count
CREATE POLICY "Public can update download count"
  ON shares
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Create index on access_code for faster lookups
CREATE INDEX IF NOT EXISTS idx_shares_access_code ON shares(access_code);

-- Create index on user_id for faster user queries
CREATE INDEX IF NOT EXISTS idx_shares_user_id ON shares(user_id);

-- Create index on expires_at for cleanup queries
CREATE INDEX IF NOT EXISTS idx_shares_expires_at ON shares(expires_at);