import { FluidNavRail, homeHeroFluidNavItems } from "../navigation";

/**
 * Home hero preset: “where next” copy + same link set as the main IA.
 * For a custom list elsewhere, use `<FluidNavRail items={...} />` directly.
 */
export function HomeHeroFluidNav() {
  return (
    <FluidNavRail
      className="mt-8"
      items={homeHeroFluidNavItems}
      title="Where next"
      description="Same fluid rail as the long-form article — pick a path."
      ariaLabel="Key destinations"
    />
  );
}
