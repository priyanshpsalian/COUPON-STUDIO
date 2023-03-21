#importing important libraries
import pandas as pd 
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
# %matplotlib inline
import warnings 
warnings.filterwarnings("ignore")
df = pd.read_csv("train.csv") #reading and displaying first 5 rows of the dataset 
df.head()
df.shape #data shape
df.platform.value_counts()  #checking for different values in platforms
df.drop(columns = ["title","id"],axis=1,inplace = True) #dropping columns as they won't play imp role.
df.drop_duplicates() #dropping duplicates
df.describe()  #more description about data
df.info() #checking for dataypes and non null values
df.drop("Offer %",axis=1,inplace=True)  #dropping this column as it's information is contained in price1
df = pd.get_dummies(df, drop_first = True )  #converting categorical columns into numerical 
df.rename(columns = {"fulfilled1": "Amazon_fulfilled"})  #for better understanding about the column
df.isna().sum()   #checking for null values
df.hist(figsize=(15,10)); #checking distributions of features
#observation : outliers are present
#imputing the null values with median not with mean due to outliers
df.fillna(df.median().round(decimals=2),inplace=True) 
#plotting heatmap to see correlation between data
fig, ax = plt.subplots(figsize=(14,8))  
sns.heatmap(df.corr(), cmap="Blues",annot=True)
#dropping columns as information of norating1, noreviews1 are contained in number of star ratings
df.drop(columns = ["norating1", "noreviews1"],inplace = True)
## MODEL BUILDING
#separating dependent and independent features
X = df.drop(columns = "price1", axis=1)
y = df["price1"]
#splitting dataset into train and test
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
X_train, X_test, y_train, y_test = train_test_split(X,y, test_size = 0.2, random_state = 2022)
## Linear Regression : Ridge and Lasso
#importing Linear Regression, Ridge and Lasso
from sklearn.linear_model import LinearRegression, Ridge,Lasso
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
lr = LinearRegression()           
lr.fit(X_train,y_train)           
y_lr_pred = lr.predict(X_test)  
print("RMSE for linear regression",np.sqrt(mean_squared_error(y_test,y_lr_pred)))
### Lasso
##Using GridSearchCV to find best parameters
lasso = Lasso()
lasso_reg = GridSearchCV(lasso,param_grid = params,scoring = "neg_mean_squared_error",cv=5 )
lasso_reg.fit(X,y) 
print(lasso_reg.best_params_)   #printing out the best parameter
lasso_final = Lasso(alpha=00.1)
lasso_final.fit(X_train,y_train) 
y_lasso_pred = lasso_final.predict(X_test)  
print("RMSE value for Ridge Regression :", np.sqrt(mean_squared_error(y_test,y_lasso_pred)))   
## Random Forest
#importing random forest regressor
from sklearn.ensemble import RandomForestRegressor
random_grid = {'max_depth': [10, 15, 20, 30, 35,40],
               'max_features': ['auto', 'sqrt'],
               'min_samples_leaf': [1, 2, 4],
               'min_samples_split': [2, 5, 10],
               'n_estimators': [130, 180, 230]}
# Use the random grid to search for best hyperparameters
# Creating the base model to tune
rf = RandomForestRegressor()
# Random search of parameters, using 3 fold cross validation, 
# search across 100 different combinations, and use all available cores
rf_random = RandomizedSearchCV(scoring="neg_mean_squared_error",estimator = rf,
                               param_distributions = random_grid, n_iter = 100, cv = 3,  random_state=2022)
# Fit the random search model
rf_random.fit(X, y)
print(rf_random.best_score_)
print("RMSE value for Random Forest",np.sqrt(-(rf_random.best_score_)))
rf_random.best_params_
### Selecting and Fitting train data
rf_final = RandomForestRegressor(n_estimators= 230,
 min_samples_split = 2,
 min_samples_leaf = 1,
 max_features = "sqrt",
 max_depth =  30, random_state=2022)
rf_final.fit(X,y)  
## Test Data
df_test = pd.read_csv("test.csv")  #reading the test data 
df_test.head()
df_test.shape 
df.columns  #offer % column is not there
df_test.drop("title",axis=1,inplace=True) #dropping the columns that are not imp
df_test.drop_duplicates() #dropping duplicates
df_test.describe()        #more info on test data
df_test.info()    #info on test data
df_test = pd.get_dummies(df_test, drop_first = True )  #converting categorical features     
df_test.isna().sum()   #checking for null values
df_test.fillna(df.median().round(decimals=2),inplace=True)  #imputing null values with median
df_test_id = df_test["id"]                                  #storing id column
#dropping columns whose info is contained in other columns
df_test.drop(columns = ["norating1","noreviews1","id"],axis=1,inplace=True) 
y_pred = rf_final.predict(df_test)       #predicting values on the best model obtained above
price1 = pd.Series(y_pred)                    
price1 #predicted price obtained form the model
#concatenating id and price1 columns for final output csv file
final_pred = pd.concat([df_test_id,price1.round(decimals=2)],axis=1,keys=["id","price1"])
final_pred.head()
final_pred.set_index("id",inplace=True) #setting id as index
final_pred.to_csv("predictions2.csv")   #converting the predictions in csv format