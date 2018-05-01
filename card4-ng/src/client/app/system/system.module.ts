import {NgModule} from '@angular/core';

import {MyPageComponent} from './my-page/my-page.component';
import {NewsPageComponent} from './news-page/news-page.component';
import {MyProfileComponent} from './my-page/my-profile/my-profile.component';
import {MyPostsComponent} from './my-page/my-posts/my-posts.component';
import {NewsPostsComponent} from './news-page/news-posts/news-posts.component';
import {NewsFilterComponent} from './news-page/news-filter/news-filter.component';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import {FooterComponent} from './shared/components/footer/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {UserInfoService} from './shared/services/user-info.service';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    SystemRoutingModule,
    CommonModule
  ],
  declarations: [
    SystemComponent,
    MyPageComponent,
    MyProfileComponent,
    MyPostsComponent,
    NewsPageComponent,
    NewsPostsComponent,
    NewsFilterComponent,
    FooterComponent,
    HeaderComponent],
  providers: [UserInfoService]
})

export class SystemModule {
}
