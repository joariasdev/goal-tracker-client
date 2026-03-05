type NavigateFn = (path: string) => void;

export const navigation = {
  navigate: ((path: string) => {
    console.warn("Navigation called before it was initialized.");
    return path;
  }) as NavigateFn,
};
