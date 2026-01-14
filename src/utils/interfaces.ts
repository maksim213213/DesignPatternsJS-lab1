export interface Comparator<T> {
  compare(a: T, b: T): number;
}

export interface Specification<T> {
  isSatisfiedBy(item: T): boolean;
}