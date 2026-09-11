-- VYRAL: production TikTok sync constraints.
-- No seed/demo rows belong in production.

create unique index if not exists tiktok_accounts_user_id_unique
  on public.tiktok_accounts (user_id);

create unique index if not exists videos_user_tiktok_video_unique
  on public.videos (user_id, tiktok_video_id)
  where tiktok_video_id is not null;

create index if not exists videos_user_published_at_idx
  on public.videos (user_id, published_at desc);

alter table public.tiktok_accounts
  add column if not exists last_synced_at timestamptz;
