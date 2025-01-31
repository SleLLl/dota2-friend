export type GsiData = {
  hero?: GsiHero;
  abilities?: GsiAbilities;
  items?: GsiItems;
  player?: GsiPlayer;
  map?: GsiMap;
  minimap?: GsiMiniMap;
  roshan?: GsiRoshan;
  buildings?: GsiBuildings;
};

export type GsiResponse = {
  added?: GsiData;
  previously?: GsiData;
} & GsiData;

export type GsiHero = {
  facet: number;
  xpos: number;
  ypos: number;
  id: number;
  name: string;
  level: number;
  xp: number;
  alive: boolean;
  respawn_seconds: number;
  buyback_cost: number;
  buyback_cooldown: number;
  health: number;
  max_health: number;
  health_percent: number;
  mana: number;
  max_mana: number;
  mana_percent: number;
  silenced: boolean;
  stunned: boolean;
  disarmed: boolean;
  magicimmune: boolean;
  hexed: boolean;
  muted: boolean;
  break: boolean;
  aghanims_scepter: boolean;
  aghanims_shard: boolean;
  smoked: boolean;
  has_debuff: boolean;
  talent_1: boolean;
  talent_2: boolean;
  talent_3: boolean;
  talent_4: boolean;
  talent_5: boolean;
  talent_6: boolean;
  talent_7: boolean;
  talent_8: boolean;
  attributes_level: number;
};

type GsiAbilityKey = `ability${number}`;

export type GsiAbilities = Record<
  GsiAbilityKey,
  {
    ability_active: boolean;
    can_cast: boolean;
    cooldown: number;
    level: number;
    name: string;
    passive: boolean;
    ultimate: boolean;
  }
>;

type GsiItem = {
  name: string;
  can_cast?: boolean;
  charges?: number;
  cooldown?: number;
  item_charges?: number;
  item_level?: number;
  passive?: boolean;
  purchaser?: number;
};

export type GsiItems = {
  [key: string]: GsiItem;
};

export type GsiPlayer = {
  accountid: string;
  activity: string;
  assists: number;
  commands_issued: number;
  deaths: number;
  denies: number;
  gold: number;
  gold_from_creep_kills: number;
  gold_from_hero_kills: number;
  gold_from_income: number;
  gold_from_shared: number;
  gold_reliable: number;
  gold_unreliable: number;
  gpm: number;
  kill_list: Record<string, number>;
  kill_streak: number;
  kills: number;
  last_hits: number;
  name: string;
  player_slot: number;
  steamid: string;
  team_name: 'dare' | 'radiant';
  team_slot: number;
  xpm: number;
};

export type GsiMap = {
  name: string;
  matchid: string;
  game_time: number;
  clock_time: number;
  daytime: boolean;
  nightstalker_night: boolean;
  radiant_score: number;
  dire_score: number;
  game_state:
    | 'DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD'
    | 'DOTA_GAMERULES_STATE_HERO_SELECTION'
    | 'DOTA_GAMERULES_STATE_STRATEGY_TIME'
    | 'DOTA_GAMERULES_STATE_TEAM_SHOWCASE'
    | 'DOTA_GAMERULES_STATE_PRE_GAME'
    | 'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS';
  paused: boolean;
  win_team: boolean;
  customgamename: string;
  ward_purchase_cooldown: number;
};

type GsiMiniMapKey = `o${number}`;

export type GsiMiniMap = Record<
  GsiMiniMapKey,
  {
    xpos: number;
    ypos: number;
    image: string;
    team: number;
    yaw: number;
    unitname: string;
    visionrange: number;
  }
>;

type GsiSelectionPriority = {
  current_priority_team_id: number;
  non_priority_team_choice: string;
  previous_priority_team_id: number;
  priority_team_choice: string;
  rules: string;
  used_coin_toss: boolean;
};

export type GsiLeague = {
  league_id: number;
  match_id: string;
  selection_priority: GsiSelectionPriority;
};

type GsiBuilding = {
  health: number;
  max_health: number;
};

type GsiDireBuildings = {
  bad_rax_melee_bot: GsiBuilding;
  bad_rax_melee_mid: GsiBuilding;
  bad_rax_melee_top: GsiBuilding;
  bad_rax_range_bot: GsiBuilding;
  bad_rax_range_mid: GsiBuilding;
  bad_rax_range_top: GsiBuilding;
  dota_badguys_fort: GsiBuilding;
  dota_badguys_tower1_bot: GsiBuilding;
  dota_badguys_tower1_mid: GsiBuilding;
  dota_badguys_tower1_top: GsiBuilding;
  dota_badguys_tower2_bot: GsiBuilding;
  dota_badguys_tower2_mid: GsiBuilding;
  dota_badguys_tower2_top: GsiBuilding;
  dota_badguys_tower3_bot: GsiBuilding;
  dota_badguys_tower3_mid: GsiBuilding;
  dota_badguys_tower3_top: GsiBuilding;
  dota_badguys_tower4_bot: GsiBuilding;
  dota_badguys_tower4_top: GsiBuilding;
};

type GsiRadiantBuildings = {
  good_rax_melee_bot: GsiBuilding;
  good_rax_melee_mid: GsiBuilding;
  good_rax_melee_top: GsiBuilding;
  good_rax_range_bot: GsiBuilding;
  good_rax_range_mid: GsiBuilding;
  good_rax_range_top: GsiBuilding;
  dota_goodguys_fort: GsiBuilding;
  dota_goodguys_tower1_bot: GsiBuilding;
  dota_goodguys_tower1_mid: GsiBuilding;
  dota_goodguys_tower1_top: GsiBuilding;
  dota_goodguys_tower2_bot: GsiBuilding;
  dota_goodguys_tower2_mid: GsiBuilding;
  dota_goodguys_tower2_top: GsiBuilding;
  dota_goodguys_tower3_bot: GsiBuilding;
  dota_goodguys_tower3_mid: GsiBuilding;
  dota_goodguys_tower3_top: GsiBuilding;
  dota_goodguys_tower4_bot: GsiBuilding;
  dota_goodguys_tower4_top: GsiBuilding;
};

export type GsiBuildings = {
  dire?: GsiDireBuildings;
  radiant?: GsiRadiantBuildings;
};

export type GsiRoshan = {
  alive: boolean;
  health: number;
  max_health: number;
  phase_time_remaining: number;
  spawn_phase: number;
  xpos: number;
  ypos: number;
  yaw: number;
  items_drop: Record<string, string>; // Flexible structure for dropped items (e.g., "item0": "item_aegis")
};

export type GsiNeutralItemTier = {
  drop_after_time: 420 | 1020 | 1620 | 2220 | 3600; // Specific allowed times
  max_count: number;
  tier: 0 | 1 | 2 | 3 | 4; // Allowed tiers
};
