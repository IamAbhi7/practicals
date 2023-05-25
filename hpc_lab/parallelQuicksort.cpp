#include <bits/stdc++.h>
#include <omp.h>

using namespace std;

int partition(int arr[], int st, int e) {
    int pivot = arr[e];
    int i = st - 1;
    int j;
    for (j = st; j < e; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
    }

    i++;
    int temp = pivot;
    arr[e] = arr[i];
    arr[i] = temp;

    return i;
}

void quicksort(int arr[], int st, int e) {
    if (st >= e) {
        return;
    }
    int pivotIdx = partition(arr, st, e);

    #pragma omp parallel sections
    {
        #pragma omp section
        {
            quicksort(arr, st, pivotIdx - 1);
        }

        #pragma omp section
        {
            quicksort(arr, pivotIdx + 1, e);
        }
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

    quicksort(arr, 0, n - 1);
    
	clock_t end = clock();
	
	for(int i=0;i<n;i++){
		cout<<arr[i]<<" ";
	}
	
	cout<< endl << "running time is :" << end - start;

    return 0;
}


/*In the modified code:

The #pragma omp parallel directive creates a parallel region, enabling multiple threads to execute the code within it.
The #pragma omp single nowait directive ensures that only one thread executes the quicksort function 
to prevent redundant parallelism. The nowait clause allows the thread to continue execution without waiting 
for other threads.
The #pragma omp sections directive creates separate sections for parallel execution.
The #pragma omp section directive specifies the code blocks that will be executed in parallel.
In this case, the quicksort function is divided into two sections: one for the left partition and 
one for the right partition.
The omp.h header file is included to access OpenMP functions and directives. */
