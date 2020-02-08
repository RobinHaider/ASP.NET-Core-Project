import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailsResolver } from './_resolvers/member-details.resolver';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import {Routes} from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { MemberEditComponent } from './members/member-edit/member-edit.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent,
                resolve: {users: MemberListResolver}},
            {path: 'members/:id', component: MemberDetailsComponent,
                resolve: {user: MemberDetailsResolver}},
            {path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            {path: 'messages', component: MessagesComponent},
            {path: 'lists', component: ListsComponent}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
]