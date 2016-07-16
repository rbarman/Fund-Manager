import { provideRouter, RouterConfig } from '@angular/router';
import {PortfolioComponent} from './components/portfolio.component'
import {StockComponent} from './components/stock.component'

export const routes: RouterConfig = [
  { 
  	path: 'portfolio', 
  	component: PortfolioComponent 
  },

  // redirect to /portfolio on an empty path
  {
  	path: '',
    redirectTo: '/portfolio',
    terminal: true
  },

  {
    path: 'stock/:symbol',
    component: StockComponent
  }
];

// bootstrap our application with an array of routes
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];