#include <iostream>
#include <bits/stdc++.h>
#include <omp.h>
using namespace std;

void merge(int arr[],int start,int mid,int end){
	int size = end-start+1;
	int temp[size];
	
	int i=start;					//i=start
	int j=mid+1;
	int k=0;
	while(i<=mid && j<=end){		//&&
		if(arr[i]<arr[j]){
			temp[k]=arr[i];
			i++;					//i++
		}else{
			temp[k]=arr[j];
			j++;					//j++
		}
		k++;
	}
	
	while(i<=mid){					//while
		temp[k++]=arr[i++];
	}
	
	while(j<=end){
		temp[k++]=arr[j++];
	}
	
	
	for(k=0,i=start;k<size;i++,k++){	//important for loop
		arr[i]=temp[k];
	}
}



void mergeSort(int arr[],int start,int end){
	if(start>=end){
		return;
	}
	int mid = start + (end-start)/2;
	#pragma omp parallel sections
        {
            #pragma omp section
                {
                    mergeSort(arr,start,mid);
                }
            #pragma omp section
                {
                    mergeSort(arr,mid+1,end);
                }
        }
	
	merge(arr,start,mid,end);
}

int main(){
	int n;
	cout<<"Enter size: ";
	cin>>n;
	int arr[n];
	
	for(int i=0;i<n;i++){
		arr[i]=rand() % 200;
	}
	cout<<"Array: ";
	for(int j=0;j<n;j++){
		cout<<arr[j]<<" ";
	}
	cout<<endl;
	
	clock_t start = clock();
	
	mergeSort(arr,0,n-1);
	
	clock_t end = clock();
	
	for(int i=0;i<n;i++){
		cout<<arr[i]<<" ";
	}
	
	cout<< endl << "running time is :" << end - start;
}

/*Basic IDEA of mergeSort
 1.Divide 
 2.mergeSort(leftPart)
   mergeSort(RightPart)
 3.merge() */
	
