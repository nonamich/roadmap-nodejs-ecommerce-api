export type DockerCompose = {
  services: {
    [key in string]: {
      image: string;
    };
  };
};
