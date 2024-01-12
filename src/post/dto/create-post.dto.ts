export class CreatePostDto {
  title: string;
  description: string;
  image: string[];
  postScope: {
    architecture: boolean;
    civilEngineering: boolean;
    industrialEngineering: boolean;
    systemsEngineering: boolean;
  };
}
