-- Insert Committee Members for Senyetse Choir
-- Run this in Supabase SQL Editor after running the main schema

-- Executive Committee
INSERT INTO choir_members (name, gender, category, role, committee_name, display_order) VALUES
('Otsile Mpitseng', 'Male', 'committee', 'Chairperson', 'Executive Committee', 1),
('Kebabetswe Diphofu', 'Female', 'committee', 'Deputy Chair', 'Executive Committee', 2),
('Ofentse Dithato', 'Male', 'committee', 'Treasurer', 'Executive Committee', 3),
('Abaleng Mogono', 'Female', 'committee', 'Secretary', 'Executive Committee', 4),
('Orebotse Tshukudu', 'Female', 'committee', 'Deputy Sec', 'Executive Committee', 5),
('Thapelo Matope', 'Male', 'committee', 'Add member 1', 'Executive Committee', 6),
('Kearoma Tshakudu', 'Female', 'committee', 'Add member 2', 'Executive Committee', 7),
('Tshepho Odirile', 'Male', 'committee', 'PRO', 'Executive Committee', 8)
ON CONFLICT DO NOTHING;

-- Youth Committee
INSERT INTO choir_members (name, gender, category, role, committee_name, display_order) VALUES
('Thusego Wemaklubu', 'Male', 'committee', 'Chairperson', 'Youth Committee', 10),
('Kabontle Kgautlwe', 'Female', 'committee', 'Deputy Chair', 'Youth Committee', 11),
('Bontle Morwaagae', 'Female', 'committee', 'Treasurer', 'Youth Committee', 12),
('Lorato Omphitlhetse', 'Female', 'committee', 'Secretary', 'Youth Committee', 13),
('Ponalo Tshukudu', 'Female', 'committee', 'Deputy Sec', 'Youth Committee', 14),
('Tlholego Tshukudu', 'Male', 'committee', 'Add member 1', 'Youth Committee', 15),
('Kenanao Phoga', 'Male', 'committee', 'Add member 2', 'Youth Committee', 16)
ON CONFLICT DO NOTHING;

-- Fundraising Committee
INSERT INTO choir_members (name, gender, category, role, committee_name, display_order) VALUES
('Botsile Moilametsi', 'Female', 'committee', 'Member', 'Fundraising Committee', 20),
('Mmaogolo Tshukudu', 'Female', 'committee', 'Member', 'Fundraising Committee', 21),
('Thabo Omphitlhetse', 'Male', 'committee', 'Member', 'Fundraising Committee', 22),
('Boago Okgetleng', 'Male', 'committee', 'Member', 'Fundraising Committee', 23),
('Kegorogile Motlapele', 'Male', 'committee', 'Member', 'Fundraising Committee', 24),
('Ishmael Diplofu', 'Male', 'committee', 'Member', 'Fundraising Committee', 25)
ON CONFLICT DO NOTHING;
