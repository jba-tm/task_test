import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getTasks} from "../data/store";

const mapStateToProps = dataStore => dataStore;
const mapDispatchToProps = {getTasks };

const mergeProps = (dataStore, actionCreators, router) => {
    return {
        ...dataStore, ...router, ...actionCreators,
        currentPage: Number(dataStore.taskData.page?dataStore.taskData.page:1),
        pageCount: Math.ceil(dataStore.taskData.count / 3),
        navigateToPage: (page) => {
            const query_params = {page: page, sort_field: dataStore.taskData.sortBy}
            actionCreators.getTasks(query_params)
            router.history.push({pathname: '/', search: "?"+new URLSearchParams({...query_params}).toString()})
        },
        setSortParams: (sortBy)=>{
            const query_params = {page: dataStore.taskData.page, sort_field: sortBy}
            actionCreators.getTasks(query_params)
            router.history.push({pathname: '/', search: "?"+new URLSearchParams({...query_params}).toString()})
        }
    }
}

export const TaskPageConnector = (PageComponent) => {
   return withRouter(connect(mapStateToProps, mapDispatchToProps,
        mergeProps)(PageComponent))
}
