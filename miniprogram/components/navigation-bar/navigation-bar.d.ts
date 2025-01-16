interface NavigationBarData {
  statusBarHeight: number;
  ios: boolean;
}

interface NavigationBarProperties {
  title: string;
  back: boolean;
  color: string;
  background: string;
}

interface NavigationBarMethods {
  back(): void;
} 