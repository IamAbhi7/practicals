#include <bits/stdc++.h>
#include <omp.h>
using namespace std;

void bubbleSort(int arr[], int n) {
    bool swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        
        #pragma omp parallel for shared(arr, swapped)
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                #pragma omp critical
                {

					int temp = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = temp;
                    swapped = true;
                }
            }
        }

        if (!swapped)
            break;
    }
}



int main() {
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
	
    bubbleSort(arr, n);

    clock_t end = clock();
	
	for(int i=0;i<n;i++){
		cout<<arr[i]<<" ";
	}
	
	cout<< endl << "running time is :" << end - start;

    return 0;
}

