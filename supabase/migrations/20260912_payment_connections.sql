create table if not exists public.payment_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('stripe','paypal')),
  provider_account_id text,
  status text not null default 'pending' check (status in ('pending','connected','restricted','disconnected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, provider)
);

alter table public.payment_connections enable row level security;

create policy "Users can read their own payment connections"
  on public.payment_connections for select
  using (auth.uid() = user_id);

create policy "Users can create their own payment connections"
  on public.payment_connections for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own payment connections"
  on public.payment_connections for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists payment_connections_user_id_idx on public.payment_connections(user_id);
