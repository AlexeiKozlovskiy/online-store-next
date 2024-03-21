'use client';

interface IcategoryCount {
  count: number;
}

export default function CategoryCount({ count }: IcategoryCount) {
  return <div className="category__count">({count})</div>;
}
