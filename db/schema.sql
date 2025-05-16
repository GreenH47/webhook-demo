-- 1. Messages table
create table public.messages
(
    id         uuid primary key     default gen_random_uuid(),
    user_id    uuid        not null
        references auth.users (id) on delete cascade,
    name       text        not null check (char_length(name) <= 120),
    body       text        not null check (char_length(body) <= 5000),
    created_at timestamptz not null default now()
);

-- 2. Helpful index for “my newest messages”
create index messages_user_created_idx
    on public.messages (user_id, created_at desc);

-- 3. Enable Row-Level Security
alter table public.messages enable row level security;

-- 4. Policies
create
policy "Users can insert their own messages"
on public.messages
  for insert with check (auth.uid() = user_id);

create
policy "Users can read their own messages"
on public.messages
  for
select using (auth.uid() = user_id);

-- allow updates/deletes by owner
create
policy "Users can modify their own messages"
on public.messages
  for
update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create
policy "Users can delete their own messages"
on public.messages
  for delete
using (auth.uid() = user_id);
