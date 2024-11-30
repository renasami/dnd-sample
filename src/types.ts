export type Item = {
  id: string;
  content: string;
  row: number; // 行位置
  col: number; // 列位置 (1または2)
  width: number; // 横幅 (1列または2列分)
};
