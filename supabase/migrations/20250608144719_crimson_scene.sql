/*
  # Create storage bucket for file uploads

  1. Storage
    - Create 'shares' bucket for file storage
    - Enable public access for files
    - Set up RLS policies for file access

  2. Security
    - Users can upload files to their own folder
    - Public can download files with valid access
*/

-- Create storage bucket for shares
INSERT INTO storage.buckets (id, name, public)
VALUES ('shares', 'shares', true)
ON CONFLICT (id) DO NOTHING;

-- Policy for authenticated users to upload files
CREATE POLICY "Users can upload files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'shares' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policy for public to download files
CREATE POLICY "Public can download files"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'shares');

-- Policy for users to delete their own files
CREATE POLICY "Users can delete their own files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'shares' AND auth.uid()::text = (storage.foldername(name))[1]);