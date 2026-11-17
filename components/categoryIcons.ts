import type { CategoryId } from "@/data/projects";
import { Blocks, Brain, Code, Phone, Shield } from "./icons";

export const categoryIcons: Record<CategoryId, typeof Brain> = {
  ai: Brain,
  web: Code,
  blockchain: Blocks,
  android: Phone,
  cyber: Shield,
};
