import type { IResolvers, MercuriusContext } from "mercurius";


import type {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from "@/graphql/generated";

export type Context = MercuriusContext
export type Resolver = IResolvers<any, Context>;
type ResolveKey = keyof Resolvers<any>;

export type Resolve<T extends ResolveKey> = Resolver[T];

export type QueryResolver = QueryResolvers<Context>;
export type MutationResolver = MutationResolvers<Context>;
