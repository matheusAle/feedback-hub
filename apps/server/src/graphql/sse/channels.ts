import { createObservable } from "@/utils/observable";
import { SSEFeedBackEvent } from "@repo/sse-types/feedbacks";

export const feedBacks = createObservable<SSEFeedBackEvent>();

export * as SSEChannels from "./channels";
