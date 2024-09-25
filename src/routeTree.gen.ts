/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SettingsImport } from './routes/settings'
import { Route as ModalImport } from './routes/modal'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as IndexImport } from './routes/index'
import { Route as SubscriptionsIndexImport } from './routes/subscriptions/index'
import { Route as SettingsIndexImport } from './routes/settings/index'
import { Route as SubscriptionsNewImport } from './routes/subscriptions/new'
import { Route as SubscriptionsSubscriptionIdImport } from './routes/subscriptions/$subscriptionId'
import { Route as SettingsProfileImport } from './routes/settings/profile'

// Create/Update Routes

const SettingsRoute = SettingsImport.update({
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const ModalRoute = ModalImport.update({
  path: '/modal',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SubscriptionsIndexRoute = SubscriptionsIndexImport.update({
  path: '/subscriptions/',
  getParentRoute: () => rootRoute,
} as any)

const SettingsIndexRoute = SettingsIndexImport.update({
  path: '/',
  getParentRoute: () => SettingsRoute,
} as any)

const SubscriptionsNewRoute = SubscriptionsNewImport.update({
  path: '/subscriptions/new',
  getParentRoute: () => rootRoute,
} as any)

const SubscriptionsSubscriptionIdRoute =
  SubscriptionsSubscriptionIdImport.update({
    path: '/subscriptions/$subscriptionId',
    getParentRoute: () => rootRoute,
  } as any)

const SettingsProfileRoute = SettingsProfileImport.update({
  path: '/profile',
  getParentRoute: () => SettingsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/modal': {
      id: '/modal'
      path: '/modal'
      fullPath: '/modal'
      preLoaderRoute: typeof ModalImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsImport
      parentRoute: typeof rootRoute
    }
    '/settings/profile': {
      id: '/settings/profile'
      path: '/profile'
      fullPath: '/settings/profile'
      preLoaderRoute: typeof SettingsProfileImport
      parentRoute: typeof SettingsImport
    }
    '/subscriptions/$subscriptionId': {
      id: '/subscriptions/$subscriptionId'
      path: '/subscriptions/$subscriptionId'
      fullPath: '/subscriptions/$subscriptionId'
      preLoaderRoute: typeof SubscriptionsSubscriptionIdImport
      parentRoute: typeof rootRoute
    }
    '/subscriptions/new': {
      id: '/subscriptions/new'
      path: '/subscriptions/new'
      fullPath: '/subscriptions/new'
      preLoaderRoute: typeof SubscriptionsNewImport
      parentRoute: typeof rootRoute
    }
    '/settings/': {
      id: '/settings/'
      path: '/'
      fullPath: '/settings/'
      preLoaderRoute: typeof SettingsIndexImport
      parentRoute: typeof SettingsImport
    }
    '/subscriptions/': {
      id: '/subscriptions/'
      path: '/subscriptions'
      fullPath: '/subscriptions'
      preLoaderRoute: typeof SubscriptionsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface SettingsRouteChildren {
  SettingsProfileRoute: typeof SettingsProfileRoute
  SettingsIndexRoute: typeof SettingsIndexRoute
}

const SettingsRouteChildren: SettingsRouteChildren = {
  SettingsProfileRoute: SettingsProfileRoute,
  SettingsIndexRoute: SettingsIndexRoute,
}

const SettingsRouteWithChildren = SettingsRoute._addFileChildren(
  SettingsRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/modal': typeof ModalRoute
  '/settings': typeof SettingsRouteWithChildren
  '/settings/profile': typeof SettingsProfileRoute
  '/subscriptions/$subscriptionId': typeof SubscriptionsSubscriptionIdRoute
  '/subscriptions/new': typeof SubscriptionsNewRoute
  '/settings/': typeof SettingsIndexRoute
  '/subscriptions': typeof SubscriptionsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/modal': typeof ModalRoute
  '/settings/profile': typeof SettingsProfileRoute
  '/subscriptions/$subscriptionId': typeof SubscriptionsSubscriptionIdRoute
  '/subscriptions/new': typeof SubscriptionsNewRoute
  '/settings': typeof SettingsIndexRoute
  '/subscriptions': typeof SubscriptionsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/modal': typeof ModalRoute
  '/settings': typeof SettingsRouteWithChildren
  '/settings/profile': typeof SettingsProfileRoute
  '/subscriptions/$subscriptionId': typeof SubscriptionsSubscriptionIdRoute
  '/subscriptions/new': typeof SubscriptionsNewRoute
  '/settings/': typeof SettingsIndexRoute
  '/subscriptions/': typeof SubscriptionsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/dashboard'
    | '/modal'
    | '/settings'
    | '/settings/profile'
    | '/subscriptions/$subscriptionId'
    | '/subscriptions/new'
    | '/settings/'
    | '/subscriptions'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/dashboard'
    | '/modal'
    | '/settings/profile'
    | '/subscriptions/$subscriptionId'
    | '/subscriptions/new'
    | '/settings'
    | '/subscriptions'
  id:
    | '__root__'
    | '/'
    | '/dashboard'
    | '/modal'
    | '/settings'
    | '/settings/profile'
    | '/subscriptions/$subscriptionId'
    | '/subscriptions/new'
    | '/settings/'
    | '/subscriptions/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRoute: typeof DashboardRoute
  ModalRoute: typeof ModalRoute
  SettingsRoute: typeof SettingsRouteWithChildren
  SubscriptionsSubscriptionIdRoute: typeof SubscriptionsSubscriptionIdRoute
  SubscriptionsNewRoute: typeof SubscriptionsNewRoute
  SubscriptionsIndexRoute: typeof SubscriptionsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRoute,
  ModalRoute: ModalRoute,
  SettingsRoute: SettingsRouteWithChildren,
  SubscriptionsSubscriptionIdRoute: SubscriptionsSubscriptionIdRoute,
  SubscriptionsNewRoute: SubscriptionsNewRoute,
  SubscriptionsIndexRoute: SubscriptionsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/modal",
        "/settings",
        "/subscriptions/$subscriptionId",
        "/subscriptions/new",
        "/subscriptions/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/modal": {
      "filePath": "modal.tsx"
    },
    "/settings": {
      "filePath": "settings.tsx",
      "children": [
        "/settings/profile",
        "/settings/"
      ]
    },
    "/settings/profile": {
      "filePath": "settings/profile.tsx",
      "parent": "/settings"
    },
    "/subscriptions/$subscriptionId": {
      "filePath": "subscriptions/$subscriptionId.tsx"
    },
    "/subscriptions/new": {
      "filePath": "subscriptions/new.tsx"
    },
    "/settings/": {
      "filePath": "settings/index.tsx",
      "parent": "/settings"
    },
    "/subscriptions/": {
      "filePath": "subscriptions/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
