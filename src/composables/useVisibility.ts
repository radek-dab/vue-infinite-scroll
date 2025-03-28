import {
  type Ref,
  type ComponentPublicInstance,
  ref,
  readonly,
  watch,
  onBeforeUnmount,
} from 'vue';

export interface VisibilityOptions {
  /** @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin */
  margin?: string | null;
}

export interface Visibility {
  visible: Readonly<Ref<boolean>>;
}

export default function useVisibility(
  target: Ref<ComponentPublicInstance | Element | null>,
  options: VisibilityOptions = {},
): Visibility {
  const visible = ref(false);
  const toElement = (target: ComponentPublicInstance | Element): Element =>
    target instanceof Element ? target : target.$el;

  const observer = new IntersectionObserver(
    (entries) => {
      visible.value = entries[0].isIntersecting;
    },
    {
      rootMargin: options.margin ?? undefined,
    },
  );

  if (target.value) {
    observer.observe(toElement(target.value));
  }

  watch(target, (newTarget, oldTarget) => {
    if (oldTarget) {
      observer.unobserve(toElement(oldTarget));
    }
    if (newTarget) {
      observer.observe(toElement(newTarget));
    }
  });

  onBeforeUnmount(() => {
    observer.disconnect();
  });

  return {
    visible: readonly(visible),
  };
}
