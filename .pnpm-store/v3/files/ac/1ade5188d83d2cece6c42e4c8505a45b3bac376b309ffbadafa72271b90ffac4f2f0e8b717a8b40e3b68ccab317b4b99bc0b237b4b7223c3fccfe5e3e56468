import * as vite from 'vite';
import { UserConfig as UserConfig$1, ServerOptions, BuildOptions } from 'vite';
import { Options } from '@vitejs/plugin-vue';
import { MarkdownItHeader } from '@mdit-vue/types';
import MarkdownIt from 'markdown-it';
import anchorPlugin from 'markdown-it-anchor';
import { FrontmatterPluginOptions } from '@mdit-vue/plugin-frontmatter';
import { HeadersPluginOptions } from '@mdit-vue/plugin-headers';
import { SfcPluginOptions } from '@mdit-vue/plugin-sfc';
import { TocPluginOptions } from '@mdit-vue/plugin-toc';
import { IThemeRegistration } from 'shiki';

declare namespace DefaultTheme {
  export interface Config {
    /**
     * The logo file of the site.
     *
     * @example '/logo.svg'
     */
    logo?: ThemeableImage

    /**
     * Custom site title in navbar. If the value is undefined,
     * `config.title` will be used.
     */
    siteTitle?: string | false

    /**
     * Custom outline title in the aside component.
     *
     * @default 'On this page'
     */
    outlineTitle?: string

    /**
     * The nav items.
     */
    nav?: NavItem[]

    /**
     * The sidebar items.
     */
    sidebar?: Sidebar

    /**
     * Info for the edit link. If it's undefined, the edit link feature will
     * be disabled.
     */
    editLink?: EditLink

    /**
     * Set custom last updated text.
     *
     * @default 'Last updated'
     */
    lastUpdatedText?: string

    /**
     * Set custom prev/next labels.
     */
    docFooter?: DocFooter

    /**
     * The social links to be displayed at the end of the nav bar. Perfect for
     * placing links to social services such as GitHub, Twitter, Facebook, etc.
     */
    socialLinks?: SocialLink[]

    /**
     * The footer configuration.
     */
    footer?: Footer

    /**
     * Adds locale menu to the nav. This option should be used when you have
     * your translated sites outside of the project.
     */
    localeLinks?: LocaleLinks

    /**
     * The algolia options. Leave it undefined to disable the search feature.
     */
    algolia?: AlgoliaSearchOptions

    /**
     * The carbon ads options. Leave it undefined to disable the ads feature.
     */
    carbonAds?: CarbonAdsOptions
  }

  // nav -----------------------------------------------------------------------

  export type NavItem = NavItemWithLink | NavItemWithChildren

  export type NavItemWithLink = {
    text: string
    link: string

    /**
     * `activeMatch` is expected to be a regex string. We can't use actual
     * RegExp object here because it isn't serializable
     */
    activeMatch?: string
  }

  export type NavItemChildren = {
    text?: string
    items: NavItemWithLink[]
  }

  export interface NavItemWithChildren {
    text?: string
    items: (NavItemChildren | NavItemWithLink)[]

    /**
     * `activeMatch` is expected to be a regex string. We can't use actual
     * RegExp object here because it isn't serializable
     */
    activeMatch?: string
  }

  // image -----------------------------------------------------------------------

  export type ThemeableImage = Image | { light: Image; dark: Image }
  export type Image = string | { src: string; alt?: string }

  // sidebar -------------------------------------------------------------------

  export type Sidebar = SidebarGroup[] | SidebarMulti

  export interface SidebarMulti {
    [path: string]: SidebarGroup[]
  }

  export interface SidebarGroup {
    text?: string
    items: SidebarItem[]

    /**
     * If `true`, toggle button is shown.
     *
     * @default false
     */
    collapsible?: boolean

    /**
     * If `true`, collapsible group is collapsed by default.
     *
     * @default false
     */
    collapsed?: boolean
  }

  export type SidebarItem =
    | { text: string; link: string }
    | { text: string; link?: string; items: SidebarItem[] }

  // edit link -----------------------------------------------------------------

  export interface EditLink {
    /**
     * Pattern for edit link.
     *
     * @example 'https://github.com/vuejs/vitepress/edit/main/docs/:path'
     */
    pattern: string

    /**
     * Custom text for edit link.
     *
     * @default 'Edit this page'
     */
    text?: string
  }

  // prev-next -----------------------------------------------------------------

  export interface DocFooter {
    /**
     * Custom label for previous page button.
     *
     * @default 'Previous page'
     */
    prev?: string

    /**
     * Custom label for next page button.
     *
     * @default 'Next page'
     */
    next?: string
  }

  // social link ---------------------------------------------------------------

  export interface SocialLink {
    icon: SocialLinkIcon
    link: string
  }

  export type SocialLinkIcon =
    | 'discord'
    | 'facebook'
    | 'github'
    | 'instagram'
    | 'linkedin'
    | 'slack'
    | 'twitter'
    | 'youtube'
    | { svg: string }

  // footer --------------------------------------------------------------------

  export interface Footer {
    message?: string
    copyright?: string
  }

  // team ----------------------------------------------------------------------

  export interface TeamMember {
    avatar: string
    name: string
    title?: string
    org?: string
    orgLink?: string
    desc?: string
    links?: SocialLink[]
    sponsor?: string
  }

  // locales -------------------------------------------------------------------

  export interface LocaleLinks {
    text: string
    items: LocaleLink[]
  }

  export interface LocaleLink {
    text: string
    link: string
  }

  // algolia ------------------------------------------------------------------

  /**
   * The Algolia search options. Partially copied from
   * `@docsearch/react/dist/esm/DocSearch.d.ts`
   */
  export interface AlgoliaSearchOptions {
    appId: string
    apiKey: string
    indexName: string
    placeholder?: string
    searchParameters?: any
    disableUserPersonalization?: boolean
    initialQuery?: string
    buttonText?: string
  }

  // carbon ads ----------------------------------------------------------------

  export interface CarbonAdsOptions {
    code: string
    placement: string
  }
}

// types shared between server and client


interface PageData {
  relativePath: string
  title: string
  titleTemplate?: string | boolean
  description: string
  headers: Header[]
  frontmatter: Record<string, any>
  lastUpdated?: number
}

type Header = MarkdownItHeader
type CleanUrlsMode =
  | 'disabled'
  | 'without-subfolders'
  | 'with-subfolders'

interface SiteData<ThemeConfig = any> {
  base: string
  cleanUrls?: CleanUrlsMode

  /**
   * Language of the site as it should be set on the `html` element.
   *
   * @example `en-US`, `zh-CN`
   */
  lang: string

  title: string
  titleTemplate?: string | boolean
  description: string
  head: HeadConfig[]
  appearance: boolean
  themeConfig: ThemeConfig
  scrollOffset: number | string
  locales: Record<string, LocaleConfig>

  /**
   * Available locales for the site when it has defined `locales` in its
   * `themeConfig`. This object is otherwise empty. Keys are paths like `/` or
   * `/zh/`.
   */
  langs: Record<
    string,
    {
      /**
       * Lang attribute as set on the `<html>` element.
       * @example `en-US`, `zh-CN`
       */
      lang: string
      /**
       * Label to display in the language menu.
       * @example `English`, `简体中文`
       */
      label: string
    }
  >
}

type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string]

interface LocaleConfig {
  lang: string
  title?: string
  titleTemplate?: string | boolean
  description?: string
  head?: HeadConfig[]
  label?: string
  selectText?: string
}

declare function resolveSiteDataByRoute(siteData: SiteData, route: string): SiteData;

declare type ThemeOptions = IThemeRegistration | {
    light: IThemeRegistration;
    dark: IThemeRegistration;
};
interface MarkdownOptions extends MarkdownIt.Options {
    lineNumbers?: boolean;
    config?: (md: MarkdownIt) => void;
    anchor?: anchorPlugin.AnchorOptions;
    attrs?: {
        leftDelimiter?: string;
        rightDelimiter?: string;
        allowedAttributes?: string[];
        disable?: boolean;
    };
    frontmatter?: FrontmatterPluginOptions;
    headers?: HeadersPluginOptions;
    sfc?: SfcPluginOptions;
    theme?: ThemeOptions;
    toc?: TocPluginOptions;
    externalLinks?: Record<string, string>;
}
declare type MarkdownRenderer = MarkdownIt;

declare const createMarkdownRenderer: (srcDir: string, options?: MarkdownOptions, base?: string) => Promise<MarkdownRenderer>;

interface UserConfig<ThemeConfig = any> {
    extends?: RawConfigExports<ThemeConfig>;
    base?: string;
    lang?: string;
    title?: string;
    titleTemplate?: string | boolean;
    description?: string;
    head?: HeadConfig[];
    appearance?: boolean;
    themeConfig?: ThemeConfig;
    locales?: Record<string, LocaleConfig>;
    markdown?: MarkdownOptions;
    lastUpdated?: boolean;
    /**
     * Options to pass on to `@vitejs/plugin-vue`
     */
    vue?: Options;
    /**
     * Vite config
     */
    vite?: UserConfig$1;
    srcDir?: string;
    srcExclude?: string[];
    outDir?: string;
    shouldPreload?: (link: string, page: string) => boolean;
    /**
     * Configure the scroll offset when the theme has a sticky header.
     * Can be a number or a selector element to get the offset from.
     */
    scrollOffset?: number | string;
    /**
     * Enable MPA / zero-JS mode.
     * @experimental
     */
    mpa?: boolean;
    /**
     * Don't fail builds due to dead links.
     *
     * @default false
     */
    ignoreDeadLinks?: boolean;
    /**
     * @experimental
     * Remove '.html' from URLs and generate clean directory structure.
     *
     * Available Modes:
     * - `disabled`: generates `/foo.html` for every `/foo.md` and shows `/foo.html` in browser
     * - `without-subfolders`: generates `/foo.html` for every `/foo.md` but shows `/foo` in browser
     * - `with-subfolders`: generates `/foo/index.html` for every `/foo.md` and shows `/foo` in browser
     *
     * @default 'disabled'
     */
    cleanUrls?: CleanUrlsMode;
    /**
     * Build end hook: called when SSG finish.
     * @param siteConfig The resolved configuration.
     */
    buildEnd?: (siteConfig: SiteConfig) => Promise<void>;
    /**
     * HTML transform hook: runs before writing HTML to dist.
     */
    transformHtml?: (code: string, id: string, ctx: {
        siteConfig: SiteConfig;
        siteData: SiteData;
        pageData: PageData;
        title: string;
        description: string;
        head: HeadConfig[];
        content: string;
    }) => Promise<string | void>;
}
declare type RawConfigExports<ThemeConfig = any> = UserConfig<ThemeConfig> | Promise<UserConfig<ThemeConfig>> | (() => UserConfig<ThemeConfig> | Promise<UserConfig<ThemeConfig>>);
interface SiteConfig<ThemeConfig = any> extends Pick<UserConfig, 'markdown' | 'vue' | 'vite' | 'shouldPreload' | 'mpa' | 'lastUpdated' | 'ignoreDeadLinks' | 'cleanUrls' | 'buildEnd' | 'transformHtml'> {
    root: string;
    srcDir: string;
    site: SiteData<ThemeConfig>;
    configPath: string | undefined;
    configDeps: string[];
    themeDir: string;
    outDir: string;
    tempDir: string;
    pages: string[];
}
/**
 * Type config helper
 */
declare function defineConfig(config: UserConfig<DefaultTheme.Config>): UserConfig<DefaultTheme.Config>;
/**
 * Type config helper for custom theme config
 */
declare function defineConfigWithTheme<ThemeConfig>(config: UserConfig<ThemeConfig>): UserConfig<ThemeConfig>;
declare function resolveConfig(root?: string, command?: 'serve' | 'build', mode?: string): Promise<SiteConfig>;
declare function resolveSiteData(root: string, userConfig?: UserConfig, command?: 'serve' | 'build', mode?: string): Promise<SiteData>;

declare function createServer(root?: string, serverOptions?: ServerOptions, recreateServer?: () => Promise<void>): Promise<vite.ViteDevServer>;

declare function build(root?: string, buildOptions?: BuildOptions & {
    base?: string;
    mpa?: string;
}): Promise<void>;

interface ServeOptions {
    base?: string;
    root?: string;
    port?: number;
}
declare function serve(options?: ServeOptions): Promise<void>;

export { DefaultTheme, HeadConfig, Header, LocaleConfig, MarkdownOptions, MarkdownRenderer, RawConfigExports, ServeOptions, SiteConfig, SiteData, ThemeOptions, UserConfig, build, createMarkdownRenderer, createServer, defineConfig, defineConfigWithTheme, resolveConfig, resolveSiteData, resolveSiteDataByRoute, serve };
