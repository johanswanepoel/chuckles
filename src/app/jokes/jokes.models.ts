export interface IJoke {
  icon_url: string;
  id: string;
  url: string;
  value: string;
  categories: unknown[];
  created_at: string;
  updated_at: string;
}

export interface IJokeState {
  jokes: IJoke[],
  favouriteJokes: IJoke[],
  timer: {
    isActive: boolean,
    interval: number
  }
}
