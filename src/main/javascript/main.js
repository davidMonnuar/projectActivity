import HostNameInfo from './utility/HostNameInfo';
import AuthorCommandTab from './commandTab/AuthorCommandTab';
import BookCommandTab from './commandTab/BookCommandTab';
import AppView from './view/AppView';

let hostNameInfo = new HostNameInfo("hostnameValue");
let authorCommandTab = new AuthorCommandTab("addAuthorForm", "addAuthorSubmitButton", "authorResponseBox", "authorListContent", "updateAuthorDatabaseButton");
let bookCoomandTab = new BookCommandTab("addBookForm", "addBookSubmitButton", "bookResponseBox", "bookListContent", "updateBookDatabaseButton", "authorsSelect");


let appView = new AppView(hostNameInfo, authorCommandTab, bookCoomandTab);
appView.initialise();