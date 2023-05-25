#include<bits/stdc++.h>
using namespace std;
 
int main()
{
    const int row = 3;
    const int col = 4;

    int mat[row][col];
    int vec[col];

    int ans[col];

    for(int i=0; i<row;i++){
        for(int j=0; j<col; j++){
            mat[i][j]=rand()%10;
        }
    }

    for(int i=0; i<col; i++){
        vec[i]=rand()%10;
    }

    cout<<"Printing Matrix"<<endl;

     for(int i=0; i<row;i++){
        for(int j=0; j<col; j++){
            cout<<mat[i][j]<<" ";
        }
        cout<<endl;
    }

    cout<<"Printing Vector"<<endl;

    for(int i=0; i<col; i++){
        cout<<vec[i]<<" ";
    }
    cout<<endl;

    cout<<"multiplication:"<<endl;


    for(int i=0; i<row; i++){
        ans[i]=0;
        #pragma omp parallel for
        for(int j=0; j<col; j++){
            ans[i] += mat[i][j] * vec[j];
        }
    }

    cout<< "printing ans: "<<endl;

    for(int i=0; i<row; i++){
        cout<<ans[i]<<" ";
    }
    cout<<endl;

    return 0;
}