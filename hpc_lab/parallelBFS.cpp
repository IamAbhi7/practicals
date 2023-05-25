#include <bits/stdc++.h>
#include <omp.h>

using namespace std;

class Graph {
    map<int, list<int>> l;
    map<int, bool> visited;
    queue<int> q;
    int x, y;
    
public:
    void addedge(int n) {
        for (int i = 0; i < n; i++) {
            cin >> x >> y;
            l[x].push_back(y);
            l[y].push_back(x);
        }
    }
    
    void ParallelBFS(int src) {
        if (!visited[src]) {
            q.push(src);
            visited[src] = true;
        }
        
        while (!q.empty()) {
            int current_size = q.size();
            
            #pragma omp parallel for
            for (int i = 0; i < current_size; i++) {
                int node;
                #pragma omp critical
                {
                    node = q.front();
                    q.pop();
                }
                
                cout << node << " ";
                
                #pragma omp for
                for (auto nbr : l[node]) {
                    if (!visited[nbr]) {
                        #pragma omp critical
                        {
                            q.push(nbr);
                            visited[nbr] = true;
                        }
                    }
                }
            }
        }
    }
};

int main() {
    Graph g;
    int m, src;
    cout << "Enter number of vertices: ";
    cin >> m;
    int n;
    cout << "Enter number of edges: ";
    cin >> n;
    cout << "Edges" << endl;
    
    
    
    g.addedge(n);
    cout << "Enter initial vertex: ";
    cin >> src;
    clock_t strt = clock();
    g.ParallelBFS(src);
    clock_t stop = clock();
    
    cout<<"\nTime required : "<<(double)(stop-strt)<<" ms"<<endl;
}

//In this modified code, the parallelization is applied to the outer loop of the BFS algorithm. 
//Each iteration of the outer loop processes a level of nodes in the BFS traversal. 
//The OpenMP directive #pragma omp parallel for parallelizes the iterations of the outer loop, 
//allowing multiple threads to work on different levels of the BFS traversal concurrently. 
//The critical sections #pragma omp critical are used to ensure thread safety when accessing and modifying shared data, 
//such as the queue and visited map.

//Please note that the effectiveness of parallelization in this case may be limited due to the nature of the BFS algorithm,
//which involves dependencies between iterations. Nonetheless, OpenMP can still provide some level of parallelism 
//by allowing multiple threads to work on different parts of the graph concurrently.

