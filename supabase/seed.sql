insert into public.trends (title, category, score, velocity, acceleration, niche_fit, competition, status, source)
values
('3 mistakes nobody tells you about…','Format',94,218,91,96,'Low','rising','demo'),
('POV: You finally understand it','Hook',91,176,95,88,'Medium','breakout','demo'),
('Before / after reveal','Visual',87,131,72,84,'Medium','rising','demo'),
('I wish I knew this sooner','Hook',84,119,68,91,'Low','rising','demo')
on conflict do nothing;