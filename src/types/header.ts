import stompJS from "stompjs";

export type HeaderProps = {
  title: string;
  arrow?: boolean;
  id?: string;
  menu?: string;
  padding?: string;
  location?: string;
  client?: stompJS.Client;
  margin?: string;
  option?: () => void;
  button?: string;
  marginLeft?: string;
};
