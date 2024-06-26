import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPaginator, Manager, ManagerFilters, SaledProductFilters } from 'src/app/shared/utils/unions';
import { ManagersState } from 'src/app/store/managers/managers.state';
import * as ManagerActions from 'src/app/store/managers/manager.actions';
import * as ManagerSelector from 'src/app/store/managers/manager.selector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerStoreService {
  managers$: Observable<Manager[]>;
  saledProducts$: Observable<SaledProductFilters[]>;
  pagingParams$: Observable<any>;

  constructor(private store: Store<{ manager: ManagersState }>) {
    this.managers$ = this.store.select(ManagerSelector.selectManagers);
    this.saledProducts$ = this.store.select(ManagerSelector.selectSaledProducts);
    this.pagingParams$ = this.store.select(ManagerSelector.selectPagingParams);
  }

  loadManagers(params: IPaginator<ManagerFilters>) {
    this.store.dispatch(ManagerActions.loadManagers({ params }));
  }

  loadSaledProducts(params: SaledProductFilters) {
    this.store.dispatch(ManagerActions.loadSaledProducts({ params }));
  }
}
