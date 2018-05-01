import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {MyPageComponent} from './my-page/my-page.component';
import {NewsPageComponent} from './news-page/news-page.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      {path: 'user/:id', component: MyPageComponent},
      {path: 'news', component: NewsPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {

}
