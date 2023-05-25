#include<bits/stdc++.h>
using namespace std;

void minReduction(vector<int> arr, int n)
{
    int min = INT_MAX;

    #pragma openmp parallel for reduction( min : min)

    for(int i=0; i<n ; i++)
    {
        if(arr[i]< min)
        {
            min  = arr[i];
        }
    }

    cout<<"min element is " << min << endl;
}

void maxReduction(vector<int> arr, int n)
{
    int max = INT_MIN;

    #pragma openmp parallel for reduction (max : max)
    for(int i=0; i<n ; i++)
    {
        if(arr[i] >  max)
        {
            max  = arr[i];
        }
    }

    cout<<"max element is "<< max << endl;

}

void sumReduction(vector<int> arr, int n)
{
    int sum = 0;

    #pragma openmp parallel for reduction (+: sum)

    for(int i=0; i<n ; i++)
    {
        sum += arr[i];
    }

    cout<<"sum is" << sum << endl;

}

void avgReduction(vector<int> arr, int n)
{
    int sum = 0;
    #pragma openmp parallel for reduction (+: sum)

    for(int i=0; i<n ; i++)
    {
        sum+= arr[i];
    }

    cout<<"avg is : " << sum /n << endl;
}
 
int main()
{

    vector<int> arr;
    int n=10;
    for(int i=0;i<n; i++)
    {
        arr.push_back( rand()%20);
    }
    for(int i=0;i<n; i++)
    {
        cout<<arr[i]<<" , ";
    }

    minReduction(arr, n);
    maxReduction(arr, n);
    sumReduction(arr, n);
    avgReduction(arr, n);


    return 0;
}