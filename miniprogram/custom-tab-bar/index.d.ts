interface TabbarItem {
  pagePath: string;
  text: string;
  iconPath: string;
  selectedIconPath: string;
}

interface TabbarData {
  list: TabbarItem[];
}

interface TabbarProperties {
  selected: number;
} 