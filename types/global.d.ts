declare module "next" {
  export interface Metadata {
    title?: string | { default: string; template: string };
    description?: string;
    [key: string]: any;
  }
}

declare module "next/font/google" {
  export interface FontOptions {
    subsets?: string[];
    weight?: string | string[];
    style?: string | string[];
    variable?: string;
    display?: string;
  }
  export interface FontOutput {
    className: string;
    variable: string;
    style: { fontFamily: string };
  }
  export function Instrument_Serif(options?: FontOptions): FontOutput;
  export function Inter(options?: FontOptions): FontOutput;
  export function JetBrains_Mono(options?: FontOptions): FontOutput;
}

declare module "next/types.js" {
  export type Metadata = any;
  export type ResolvingMetadata = Promise<any>;
  export type ResolvingViewport = Promise<any>;
  export type Viewport = any;
}

declare module "next/dist/lib/metadata/types/metadata-interface.js" {
  export type ResolvingMetadata = Promise<any>;
  export type ResolvingViewport = Promise<any>;
  export type Metadata = any;
  export type Viewport = any;
}

declare module "next/dist/lib/metadata/types/metadata-interface" {
  export type ResolvingMetadata = Promise<any>;
  export type ResolvingViewport = Promise<any>;
  export type Metadata = any;
  export type Viewport = any;
}

declare module "lucide-react" {
  import * as React from "react";
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }
  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;
  export const ArrowUpRight: LucideIcon;
  export const ArrowDownRight: LucideIcon;
  export const Volume2: LucideIcon;
  export const VolumeX: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Github: LucideIcon;
  export const Linkedin: LucideIcon;
  export const Mail: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Terminal: LucideIcon;
  export const Cpu: LucideIcon;
  export const Cloud: LucideIcon;
  export const Layers: LucideIcon;
  export const Phone: LucideIcon;
  export const MapPin: LucideIcon;
  export const CheckCircle2: LucideIcon;
}
