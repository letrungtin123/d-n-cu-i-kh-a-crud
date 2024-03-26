export interface ISkill {
  id: number;
  title: string;
  desc: string;
}
export interface UpdateSkill {
  id: number;
  title?: string;
  desc?: string;
}