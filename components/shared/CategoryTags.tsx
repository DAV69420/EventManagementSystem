"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pagecat = searchParams.get("category") ?? 'All'

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[])
    }

    getCategories();
  }, [])

  const onSelectCategory = (category: string) => {
    let newUrl = '';

    if (category && category !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: category
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category']
      })
    }

    router.push(newUrl, { scroll: false });
  }

  return (
    <div className="w-full scrollvisible">
      <div className="w-full whitespace-nowrap overflow-hidden overflow-x-auto noscrollbar ">
        <div className="flex w-max space-x-2 md:space-x-4">
          <Button variant={"outline"} onClick={() => onSelectCategory('All')} className={`btntags ${pagecat == "All" && 'tagactive'}`}>
            All
          </Button>
          {categories.map((category) => (
            <Button variant={"outline"} onClick={() => onSelectCategory(category.name)} key={category._id} className={`btntags ${pagecat == category.name ? 'tagactive' : ''}`}>
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryFilter